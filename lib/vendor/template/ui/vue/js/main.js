import Vue from "vue";
import App from "../../../vendor/template/ui/vue/App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
