import Vue from "vue";
import Router from "vue-router";

import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./components/pages/HomePage";
import ContactUs from "./components/pages/ContactUs";
import Error404 from "./components/pages/404";

Vue.use(Router);

const router = new Router({
	// mode: "history",
	mode: "hash",
	routes: [
		{
			path: "/",
			component: MainLayout,
			children: [
				{
					path: "",
					name: "home-page",
					component: HomePage,
				},
				{
					path: "/contact-us",
					name: "contact-us",
					component: ContactUs,
				},
			],
		},
		{
			path: "*",
			name: "404",
			component: Error404,
		},
	],
});

export default router;
