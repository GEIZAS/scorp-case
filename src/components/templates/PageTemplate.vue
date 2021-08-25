<template>
	<v-card>
		<v-app-bar app color="primary">
			<v-app-bar-nav-icon>
				<slot name="icon"></slot>
			</v-app-bar-nav-icon>

			<v-toolbar-title>
				<slot name="title"></slot>
			</v-toolbar-title>

			<v-spacer />
			<v-btn icon @click="goToContactUs()">
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
							<v-btn text @click="changeLanguage(item.value)">
								{{ item.title }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
			<v-btn v-if="!userInfo" icon @click="showLoginDialog()">
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
		</v-app-bar>

		<v-container>
			<slot name="content"> </slot>
		</v-container>

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
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginDialog from "../partial/dialog/LoginDialog.vue";

export default {
	components: {
		LoginDialog,
	},
	data() {
		return {
			showUserMenu: false,
			loginDialog: {
				visibility: false,
				show: () => (this.loginDialog.visibility = true),
				hide: () => (this.loginDialog.visibility = false),
			},
			languages: [
				{ title: this.$t("$language.tr"), value: "tr" },
				{ title: this.$t("$language.en"), value: "en" },
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
	computed: {
		...mapGetters(["userInfo"]),
	},
	methods: {
		...mapActions(["setLanguage", "logoutUser", "showSnackbar"]),
		goToContactUs() {
			this.$router.push("contact-us");
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
	},
	created() {
		//
	},
};
</script>
