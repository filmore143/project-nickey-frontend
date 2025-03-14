import { Screen } from "quasar";
import { Dark } from "quasar";
export default function () {
  return {
    currentScreen: Screen.name,
    currentScreenProperty: Screen,
    navLinks: [
      {
        title: "DASHBOARD",
        caption: "",
        icon: "bar_chart",
        link: "/dashboard",
        children: [],
      },
      {
        title: "PULSE",
        caption: "",
        icon: "query_stats",
        link: "",
        children: [
          {
            title: "METRICS",
            icon: "leaderboard",
            link: "",
            children: [],
          },
          {
            title: "LEARNING MODULE",
            icon: "local_library",
            link: "/learning-module",
            children: [],
          },
          {
            title: "COACHING",
            icon: "co_present",
            link: "",
            children: [],
          },
        ],
      },
    ],
  };
}
