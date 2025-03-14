<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { LocalStorage } from "quasar";
export default defineComponent({
  name: "App",
  data() {
    return {};
  },
  created() {
    this.getLocalStorage();
  },
  methods: {
    async getLocalStorage() {
      if (LocalStorage.getItem("access_token")) {
        await this.$store.dispatch("users/setUserData");
      } else if (!LocalStorage.getItem("access_token")) {
        this.$router.push("/");
      }
    }, //END OF getCookie METHOD
  }, //end of method
  watch: {
    "$route.name": {
      handler(val) {
        this.getLocalStorage();
        // this.checkIfAlreadySubmittedPersonalInformation();
      },
    },
  },
});
</script>
