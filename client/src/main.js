import "./plugins/bootstrap";
import "./plugins/font-awesome";
import "./plugins/animate";
import "./plugins/nprogress";

import "./assets/scss/main.scss";

import Vue from "vue";

import App from "./App.vue";

import { router } from "./router";
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
