<template>
  <q-item
    clickable
    tag="a"
    @click="redirectRoute({ name: title, icon: icon, link: link })"
    v-if="children.length === 0"
    :class="
      this.activeRoute(link, { name: title, icon: icon, link: link })
        ? 'text-white bg-green-8 text-weight-bold'
        : 'text-black bg-white'
    "
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-list v-else bordered dark separator>
    <q-expansion-item
      :icon="icon"
      :label="title"
      header-class="text-black bg-white"
      expand-icon-class="text-green-8"
      bordered
      group="accordion"
    >
      <div v-for="child in children" :key="child">
        <q-item
          clickable
          tag="a"
          @click="
            redirectRoute({
              name: child.title,
              icon: child.icon,
              link: child.link,
            })
          "
          :class="
            this.activeRoute(child.link, {
              name: child.title,
              icon: child.icon,
              link: child.link,
            })
              ? 'text-black bg-green-5 text-weight-bold'
              : 'text-black bg-white'
          "
        >
          <q-item-section v-if="child.icon" avatar class="q-ml-md">
            <q-icon :name="child.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ child.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  data() {
    return {
      isGraduating: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    children: {
      type: Array,
    },
  },
  emit: ["setCurrentRoute"],
  methods: {
    activeRoute(route, routeDetails) {
      if (this.$route.fullPath === route) {
        this.$emit("setCurrentRoute", routeDetails);
        return true;
      }
      return false;
    },
    redirectRoute(route) {
      this.$router.push(route.link);
    }, //end of redirect route
  },
});
</script>
