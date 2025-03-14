<template>
  <div class="body">
    <div class="wrapper">
      <!-- <q-img class="logo" src="../assets/eLogo.png" alt="logo" /> -->

      <q-form @submit="onSubmit" method="post" class="q-gutter-md">
        <div class="text-h5 text-weight-bold text-primary text-center">
          PERFORMANCE PULSE
        </div>

        <q-input
          v-model.trim="posts.username"
          label="USERNAME"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Username is required!']"
        >
          <template v-slot:append>
            <q-icon name="person" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input
          v-model.trim="posts.password"
          label="PASSWORD"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required!']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="">
          <q-btn
            class="btn"
            data-callback="onSubmit"
            label="LOGIN"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import QSpinnerPuff from "quasar/src/components/spinner/QSpinnerPuff.js";
import { LocalStorage } from "quasar";
import { jwtDecrypt } from "../helpers";

export default {
  name: "LoginPage",
  data() {
    let timer;
    return {
      posts: {
        username: null,
        password: null,
      },
      login: [],
      isPwd: true, //eto para kapag yung user gusto nya makita yung tinype nyang password
      showRecaptcha: true,
      loadingTimeout: 30000, // 30 seconds
      captchaResponse: null,
      disableButton: true,
      timer,
      loading: true,
    };
  },
  methods: {
    async onSubmit() {
      const response = await this.$store.dispatch(
        "users/loginUsers",
        this.posts
      );

      if (response.error) {
        this.$q.notify({
          message:
            "Invalid Credentials! Please input correct email and password",
          position: "top",
          type: "negative",
        });
      } else if (response.length !== 0 || response.length !== undefined) {
        this.$q.loading.show({
          spinner: QSpinnerPuff,
          spinnerColor: "primary",
          spinnerSize: 140,
          backgroundColor: "grey",
          message: "WELCOME TO PERFORMANCE PULSE",
          messageColor: "primary",
        });
        // hiding in 2s
        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
          this.$router.push("/dashboard");
        }, 2000);
      } else {
        this.$q.notify({
          message:
            "Invalid Credentials! Please input correct email and password",
          position: "top",
          type: "negative",
        });
      }
    }, //end of onSubmit methods
    forgotPassword() {
      this.$router.push("/forgot-password");
    },
  }, //END OF METHOD
};
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: #1f1f47; */
  background-color: rgb(18, 103, 2);
  // background-image: url("../assets/uerm-background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
}

.logo {
  width: 120px;
  height: 120px;
  margin-left: 31%;
  margin-top: -90px;
  margin-bottom: 30px;
  border-radius: 50%;
}

.wrapper {
  position: relative;
  width: 370px;
  height: 370px;
  align-items: center;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  margin-top: 20px;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #054266;
  color: #fff;
  // border-radius: 25px;
  letter-spacing: 1.3px;
  margin-top: 12px;
}

.wrapper .btn:hover {
  background-color: #041c47;
}

#or {
  color: #054266;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
}
</style>
