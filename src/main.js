import Vue from "vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import i18n from "./plugins/i18n";
import "vuetify/dist/vuetify.min.css";
import { Setting, getSetting } from "./data/ls";
import { DeviceUUID } from "device-uuid";

var device = new DeviceUUID().parse();
Object.defineProperty(Vue.prototype, "$device", {
	value: device,
});

vuetify.framework.theme.dark = true;
const theme = vuetify.framework.theme.dark;

Object.defineProperty(Vue.prototype, "$color", {
	value: theme,
});

// Localization settings
i18n.languageOptions = ["en", "tr"];
let lang = getSetting(Setting.locale) || device.language.substring(0, 2);
if (!i18n.languageOptions.includes(lang)) lang = "tr";
i18n.locale = lang;
document.getElementsByTagName("html")[0].setAttribute("lang", lang);
vuetify.framework.lang.current = lang;
Object.defineProperty(Vue.prototype, "$lang", { value: lang });

new Vue({
	vuetify,
	router,
	store,
	i18n,
	// mixins: [coder],
	render: (h) => h(App),
}).$mount("#app");
