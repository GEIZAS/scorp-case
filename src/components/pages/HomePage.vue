<template>
	<page-template>
		<template slot="icon">
			<v-btn icon @click="goToHome()">
				<v-icon>
					mdi-home-outline
				</v-icon>
			</v-btn>
		</template>

		<template slot="title">
			{{ $t("homePage") }}
		</template>

		<template slot="buttons"></template>

		<template slot="content">
			<v-card>
				<v-card-title>
					{{ $t("$dummyText.homePage.title") }}
				</v-card-title>
				<v-card-text>
					{{ $t("$dummyText.homePage.body") }}
				</v-card-text>
			</v-card>
		</template>
	</page-template>
</template>

<script>
import PageTemplate from "@/components/templates/PageTemplate";

export default {
	components: {
		PageTemplate,
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>
