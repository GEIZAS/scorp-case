<template>
	<div>
		<v-app-bar color="primary">
			<slot name="icon"></slot>

			<v-divider vertical />

			<v-toolbar-title>
				<slot name="title"></slot>
			</v-toolbar-title>

			<v-spacer />

			<web-app-bar
				v-if="!isMobile"
				@routerAction="routerAction"
				@changeLanguage="changeLanguage"
				@showLoginDialog="showLoginDialog"
				@logoutAction="logoutAction"
				:userInfo="userInfo"
				:languages="languages"
			/>
			<v-btn v-else icon @click="drawerAction">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
		</v-app-bar>

		<v-container style="max-width:1185px;">
			<slot name="content"> </slot>
		</v-container>

		<mobile-navigation-drawer
			v-if="showDrawer"
			v-model="showDrawer"
			@routerAction="routerAction"
			@changeLanguage="changeLanguage"
			@showLoginDialog="showLoginDialog"
			@logoutAction="logoutAction"
			:userInfo="userInfo"
			:languages="languages"
		/>

		<v-footer dark padless>
			<v-card flat tile class="indigo lighten-1 white--text text-center">
				<v-card-text>
					<v-tooltip
						v-for="(item, index) in socialMedia"
						:key="index"
						bottom
						open-delay="500"
					>
						<template v-slot:activator="{ on }">
							<v-btn class="mx-4" icon v-on="on">
								<v-icon size="24px">
									{{ item.icon }}
								</v-icon>
							</v-btn>
						</template>
						<span>
							{{ item.title }}
						</span>
					</v-tooltip>
				</v-card-text>

				<v-card-text class="white--text pt-0">
					{{ $t("$dummyText.footer") }}
				</v-card-text>

				<v-divider />

				<v-card-text class="white--text">
					{{ new Date().getFullYear() }} — <strong>Muhammed A. Topcu</strong>
				</v-card-text>
			</v-card>
		</v-footer>
		<login-dialog
			v-if="loginDialog.visibility"
			v-model="loginDialog.visibility"
		/>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginDialog from "../partial/dialog/LoginDialog";
import WebAppBar from "../partial/webAppBar";
import MobileNavigationDrawer from "../partial/mobileNavigationDrawer";

export default {
	components: {
		LoginDialog,
		WebAppBar,
		MobileNavigationDrawer,
	},
	data() {
		return {
			showWebAppBar: true,
			showDrawer: false,

			loginDialog: {
				visibility: false,
				show: () => (this.loginDialog.visibility = true),
				hide: () => (this.loginDialog.visibility = false),
			},
			languages: [
				{
					title: this.$t("$language.tr"),
					value: "tr",
					icon: "mdi-alpha-t-circle-outline",
				},
				{
					title: this.$t("$language.en"),
					value: "en",
					icon: "mdi-alpha-e-circle-outline",
				},
			],
			socialMedia: [
				{
					title: this.$t("$socialMedia.facebook"),
					icon: "mdi-facebook",
				},
				{
					title: this.$t("$socialMedia.twitter"),
					icon: "mdi-twitter",
				},
				{
					title: this.$t("$socialMedia.linkedin"),
					icon: "mdi-linkedin",
				},
				{
					title: this.$t("$socialMedia.instagram"),
					icon: "mdi-instagram",
				},
			],
		};
	},
	watch: {
		isMobile() {
			this.showDrawer = false;
		},
	},
	computed: {
		...mapGetters(["userInfo"]),
		isMobile() {
			return this.$vuetify.breakpoint.xsOnly;
		},
	},
	methods: {
		...mapActions(["setLanguage", "logoutUser", "showSnackbar"]),
		routerAction(pageRoute) {
			this.$router.push(pageRoute);
		},
		showLoginDialog() {
			this.loginDialog.show();
		},
		changeLanguage(val) {
			this.setLanguage(val);
		},
		logoutAction(userInfo) {
			this.$store.dispatch("showConfirmDialog", {
				title: this.$t("confirm"),
				message: this.$t("$message.logout.askConfirm"),
				onConfirm: () => {
					this.$store.dispatch("showProgressBar");
					this.logoutUser();
					this.showUserMenu = false;
					this.$store.dispatch("showSnackbar", {
						message: this.$t("$message.logout.success", {
							item: userInfo.name,
						}),
					});
					this.$store.dispatch("hideProgressBar");
				},
			});
		},
		drawerAction() {
			this.showDrawer = !this.showDrawer;
		},
	},
};
</script>
