<template>
  <div class="q-gutter-md q-pa-md q-ma-md">
    <div class="row q-pa-md items-center justify-between wrap full-width">
      <div class="row items-center text-primary">
        <span>
          <q-icon size="xl" :name="this.currentRouteDetails.icon"></q-icon>
        </span>
        <span class="q-pl-md text-h4 text-weight-bold">{{
          currentRouteDetails.name
        }}</span>
      </div>
      <div class="text-primary">
        <ClockWidget></ClockWidget>
      </div>
    </div>
    <q-separator></q-separator>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ClockWidget from "src/components/Partials/ClockWidget.vue";
export default defineComponent({
  name: "HeaderWidget",
  components: {
    ClockWidget,
  },
  props: {
    currentRouteDetails: {
      type: Object,
    },
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    ...mapGetters({
      navLinks: "helpers/navLinks",
    }),
  },
});
</script>
