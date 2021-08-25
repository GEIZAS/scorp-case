<template>
	<page-template>
		<template slot="icon">
			<v-icon class="mr-4">
				mdi-email
			</v-icon>
		</template>

		<template slot="title">
			<v-card-title>
				{{ $t("contactUs") }}
			</v-card-title>
		</template>

		<template slot="buttons"></template>

		<template slot="content" class="mb-16">
			<v-card class="mb-16 pb-16">
				<v-card-title>
					{{ $t("$dummyText.contactUs.title") }}
				</v-card-title>
				<v-card-text>
					<v-form ref="form" v-model="valid">
						<v-text-field
							v-model="currentItem.name"
							:label="$t('name')"
							:rules="rules.name"
						/>
						<v-text-field
							v-model="currentItem.email"
							:label="$t('email')"
							:rules="rules.email"
							type="email"
						/>
						<v-text-field
							v-model="currentItem.phone"
							:label="$t('phoneNumber')"
							:rules="rules.phone"
						/>
						<v-autocomplete
							v-model="currentItem.country"
							:items="countryList"
							:item-value="countryList.id"
							:item-text="(i) => `${$t(`$country.${i.name}`)}`"
							:label="$t('country')"
							:rules="rules.country"
						/>
						<v-textarea v-model="currentItem.message">
							<template v-slot:label>
								{{ $t("message") }}
							</template>
						</v-textarea>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="sendAction(currentItem)" color="primary" outlined>
						{{ this.$t("login") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</page-template>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/templates/PageTemplate";

export default {
	components: {
		PageTemplate,
	},
	data() {
		return {
			valid: true,
			currentItem: null,
			countryList: [
				{ id: "TR", name: "turkey" },
				{ id: "US", name: "usa" },
				{ id: "GB", name: "uk" },
				{ id: "DE", name: "germany" },
				{ id: "SE", name: "sweden" },
				{ id: "KE", name: "kenya" },
				{ id: "BR", name: "brazil" },
				{ id: "ZW", name: "zimbabwe" },
			],
			messageTemplate: {
				name: null,
				email: null,
				phone: null,
				country: null,
				message: null,
			},
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
				phone: [
					(v) => {
						if (!v)
							return this.$t("$validation.required", {
								item: this.$t("phoneNumber"),
							});
						else if (isNaN(v))
							return this.$t("$validation.invalid", {
								item: this.$t("phoneNumber"),
							});
						else return true;
					},
				],
			},
		};
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
		sendAction(val) {
			if (this.valid) {
				const message = {
					name: val.name,
					email: val.email,
					phonenumber: val.phone,
					country_code: val.country,
					text: val.message,
				};
				console.log("CONTACT_US :>> ", message);
			} else this.$refs.form.validate();
		},
	},
	created() {
		this.currentItem = this.messageTemplate;
		if (this.userInfo) {
			if (this.userInfo.name) this.currentItem.name = this.userInfo.name;
			if (this.userInfo.email) this.currentItem.email = this.userInfo.email;
		}
	},
};
</script>
