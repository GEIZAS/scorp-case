<template>
	<v-dialog v-bind:value="value" persistent max-width="360px" eager>
		<v-card v-if="currentItem">
			<v-card-title>
				<span class="headline">{{ $t("userLogin") }}</span>
				<v-spacer />
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
			</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid">
					<v-text-field
						v-model="currentItem.name"
						:label="$t('name')"
						:rules="rules.name"
						type="name"
					/>
					<v-text-field
						v-model="currentItem.email"
						:label="$t('email')"
						:rules="rules.email"
						type="email"
					/>
					<v-text-field
						v-model="currentItem.password"
						:label="$t('password')"
						:rules="rules.password"
						type="password"
					/>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn text @click="closeAction" :disabled="disable" outlined>
					{{ this.$t("close") }}
				</v-btn>
				<v-spacer />
				<v-btn
					text
					@click="loginAction(currentItem)"
					color="primary"
					:loading="loging"
					:disabled="disable"
					outlined
				>
					{{ this.$t("login") }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
	props: ["value"],
	data() {
		return {
			valid: true,
			loging: false,
			currentItem: null,
			userTemplate: {
				name: "",
				email: "",
				password: "",
			},
			languages: [
				{ title: this.$t("$language.tr"), value: "tr" },
				{ title: this.$t("$language.en"), value: "en" },
			],
			rules: {
				name: [
					(v) => {
						if (!v)
							return this.$t("$validation.required", {
								item: this.$t("name"),
							});
						else return true;
					},
				],
				email: [
					(v) => {
						if (!v)
							return this.$t("$validation.required", {
								item: this.$t("email"),
							});
						else if (!/.+@.+\..+/.test(v))
							return this.$t("$validation.invalid", {
								item: this.$t("email"),
							});
						else return true;
					},
				],
				password: [
					(v) => {
						if (!v)
							return this.$t("$validation.required", {
								item: this.$t("password"),
							});
						else return true;
					},
				],
			},
		};
	},
	computed: {
		disable() {
			return this.loging;
		},
	},
	methods: {
		...mapActions(["setLanguage", "loginUser", "showSnackbar"]),
		loginAction(userInfo) {
			if (this.valid) {
				this.loginUser(userInfo);
				this.$store.dispatch("showSnackbar", {
					message: this.$t("$message.login.success", { item: userInfo.name }),
				});
			} else this.$refs.form.validate();
		},
		closeAction() {
			if (!this.loging) {
				this.$emit("input", false);
				this.currentItem = null;
			}
		},
		changeLanguage(val) {
			this.setLanguage(val);
		},
	},
	created() {
		this.currentItem = this.userTemplate;
	},
};
</script>
