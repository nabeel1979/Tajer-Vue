import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { FontAwesomeIcon } from "./assets/FontAwesomeIcon/FontAwesome";
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const options = {
  autoClose: 5000,
  position: "top-right",
};

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(Toast, options)
  .mount("#app");

