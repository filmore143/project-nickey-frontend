<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Project Name and Menu Button in one line -->
        <q-toolbar-title class="toolbar-title">
          <div class="row">
            <div class="text-weight-bold text-uppercase q-ml-md">
              {{ projectName }}
            </div>
            <!-- Menu button -->
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
              class="menu-btn q-ml-md"
            />
          </div>
        </q-toolbar-title>

        <!-- Spacer to push logout to the far right -->
        <div class="q-mx-xs" />

        <!-- Logout button (aligned to the right) -->
        <q-btn
          square
          color="white"
          flat
          icon="logout"
          @click="logout()"
          v-if="!this.$q.platform.is.desktop"
        />
        <q-btn-dropdown
          color="white"
          outline
          icon="person"
          :label="`Welcome back,  ${this.userInfo.first_name}`"
          flat
          v-if="this.$q.platform.is.desktop"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div
                class="row text-overline justify-center text-h6 text-weight-bold q-mb-lg"
              >
                FULL NAME
              </div>

              <div class="text-overline text-uppercase">
                <!-- Degree Program: {{ this.studentInfo.college }} <br /> -->
                Name:
                {{ this.userInfo.first_name + " " + this.userInfo.last_name
                }}<br />
                Role: {{ this.userInfo.role }}<br />
                <!-- Year Level: <br /> -->
              </div>
            </div>

            <q-separator vertical inset class="q-mx-lg"></q-separator>

            <div class="column items-center">
              <q-avatar class="shadow-5" size="120px" v-ripple>
                <q-img src="../assets/profile.png" />
              </q-avatar>
              <div class="q-mt-md text-overline"></div>

              <q-btn
                color="negative"
                label="Logout"
                icon="logout"
                size="sm"
                @click="logout()"
                v-close-popup
                class="q-mb-md full-width text-weight-bold"
              />
              <div class="text-overline text-uppercase">Pulse V1.0.0</div>
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <!-- <q-footer ckass="bg-blue-10" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div
            class="row text-uppercase justify-between text-overline text-weight-light"
          >
            <div>Powered by Nike Crescini</div>
            <div>Copyright &copy; {{ currentYear }}</div>
            <div>
              {{ projectShortName }}
              {{ projectVersion }}
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
    <q-drawer elevated v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-overline text-uppercase text-center">
          <q-avatar size="104px">
            <q-img src="../assets/profile.png" />
          </q-avatar>
          <div class="q-mt-md col-12">{{ this.userInfo.role }}</div>
          <div class="col-12">
            {{ this.userInfo.first_name + " " + this.userInfo.last_name }}
          </div>
        </q-item-label>
        <EssentialLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
          @setCurrentRoute="setCurrentRoute"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <HeaderWidget
        :currentRouteDetails="this.currentRouteDetails"
      ></HeaderWidget>
      <div class="q-pa-md q-ma-md">
        <q-card flat>
          <q-card-section>
            <router-view />
          </q-card-section>
        </q-card>
      </div>
      <UpButton></UpButton>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { mapGetters } from "vuex";
import HeaderWidget from "src/components/Partials/HeaderWidget.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
    HeaderWidget,
  },
  data() {
    return {
      leftDrawerOpen: false,
      currentRouteDetails: {},
    };
  },
  methods: {
    async logout() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you would like to logout?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.loading.show({
            boxClass: "bg-grey-2 text-grey-9",
            spinnerColor: "primary",
            message:
              'Logging out now...<br/><span class="text-yellow-8 text-italic">Please wait...</span>',
            html: true,
          });

          // hiding in 3s
          setTimeout(async () => {
            this.$q.loading.hide();
            void 0;

            await this.$store.dispatch("users/logout");
            this.$router.push("/");
          }, 2000);
        })
        .onCancel(() => {});
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    setCurrentRoute(route) {
      this.currentRouteDetails = route;
    },
  },
  computed: {
    projectName() {
      return process.env.PROJECT_NAME;
    },
    projectShortName() {
      return process.env.PROJECT_SHORT_NAME;
    },
    projectVersion() {
      return process.env.PROJECT_VERSION;
    },
    currentYear() {
      return new Date().getFullYear();
    },
    ...mapGetters({
      navLinks: "helpers/navLinks",
      userInfo: "users/userAccount",
    }),
  },
});
</script>
