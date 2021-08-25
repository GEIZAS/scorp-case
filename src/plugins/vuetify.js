import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

import i18n from "./i18n";

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#3f51b5",
				secondary: "#ffc400",
				accent: "#ba68c8",
				error: "#f44336",
				info: "#00b0ff",
				success: "#4caf50",
				warning: "#ff9800",
				neutral: "#607d8b",
			},
			dark: {
				primary: "#7986cb",
				secondary: "#ffc400",
				accent: "#ba68c8",
				error: "#f44336",
				info: "#00b0ff",
				success: "#4caf50",
				warning: "#ff9800",
				neutral: "#607d8b",
			},
		},
	},
	icons: {
		iconfont: "md",
	},
	lang: {
		t: (key, ...params) => i18n.t(key, params),
	},
});
