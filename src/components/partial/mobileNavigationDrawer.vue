<template>
	<div>
		<v-navigation-drawer v-model="show" absolute temporary fixed>
			<v-list-item v-if="userInfo">
				<v-list-item-content>
					<v-list-item-title class="text-h6">
						{{ userInfo.name }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ userInfo.email }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider />

			<v-list dense nav>
				<v-list-item class="my-1">
					<v-btn text @click="routerAction(`/`)">
						<v-icon class="mr-5">mdi-home</v-icon>
						{{ $t("homePage") }}
					</v-btn>
				</v-list-item>

				<v-list-item class="my-1">
					<v-btn text @click="routerAction(`contact-us`)">
						<v-icon class="mr-5">mdi-email-outline</v-icon>
						{{ $t("contactUs") }}
					</v-btn>
				</v-list-item>

				<v-divider />

				<v-list-item
					class="my-1"
					v-for="(item, index) in languages"
					:key="index"
				>
					<v-icon class="ml-4">{{ item.icon }}</v-icon>
					<v-btn text @click="changeLanguageAction(item.value)">
						{{ item.title }}
					</v-btn>
				</v-list-item>

				<v-divider />

				<v-list-item v-if="userInfo" class="my-1">
					<v-btn text @click="logoutAction(userInfo)">
						<v-icon class="mr-5">mdi-logout</v-icon>
						{{ $t("logout") }}
					</v-btn>
				</v-list-item>

				<v-list-item v-else class="my-1">
					<v-btn text @click="showLoginDialogAction()">
						<v-icon class="mr-5">mdi-login</v-icon>
						{{ $t("login") }}
					</v-btn>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	props: ["value", "userInfo", "languages"],
	data() {
		return {
			show: false,
		};
	},
	methods: {
		drawerAction() {
			this.$emit("drawerAction", true);
		},
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
	created() {
		this.show = true;
	},
};
</script>
