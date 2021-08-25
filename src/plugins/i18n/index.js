import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en";
import tr from "./tr";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: "tr",
	fallbackLocale: "en",
	messages: { en, tr },
});

export default i18n;
