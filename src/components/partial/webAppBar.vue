<template>
	<div>
		<v-btn icon @click="routerAction(`/`)">
			<v-icon>mdi-home-outline</v-icon>
		</v-btn>
		<v-btn icon @click="routerAction(`contact-us`)">
			<v-icon>mdi-email-outline</v-icon>
		</v-btn>

		<v-menu
			:close-on-content-click="false"
			transition="slide-y-transition"
			offset-y
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon>mdi-earth</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-list>
					<v-list-item v-for="(item, index) in languages" :key="index">
						<v-btn text @click="changeLanguageAction(item.value)">
							{{ item.title }}
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
		<v-btn v-if="!userInfo" icon @click="showLoginDialogAction()">
			<v-icon>mdi-login</v-icon>
		</v-btn>
		<v-menu
			v-else-if="userInfo"
			v-model="showUserMenu"
			:close-on-content-click="false"
			transition="slide-y-transition"
			offset-y
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon left>mdi-account-outline</v-icon>
					{{ userInfo.name }}
				</v-btn>
			</template>
			<v-card>
				<v-list>
					<v-list-item>
						{{ userInfo.email }}
					</v-list-item>
					<v-list-item>
						<v-btn text @click="logoutAction(userInfo)">
							{{ $t("logout") }}
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
export default {
	props: ["value", "userInfo", "languages"],
	data() {
		return {
			showUserMenu: false,
		};
	},
	methods: {
		routerAction(val) {
			this.$emit("routerAction", val);
		},
		changeLanguageAction(item) {
			this.$emit("changeLanguage", item);
		},
		showLoginDialogAction() {
			this.$emit("showLoginDialog", true);
		},
		logoutAction(userInfo) {
			this.$emit("logoutAction", userInfo);
		},
	},
};
</script>
