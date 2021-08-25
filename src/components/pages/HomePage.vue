<template>
	<page-template>
		<template slot="icon">
			<v-icon class="mr-4">
				mdi-home
			</v-icon>
		</template>

		<template slot="title">
			<v-card-title>
				{{ $t("homePage") }}
			</v-card-title>
		</template>

		<template slot="buttons"></template>

		<template slot="content">
			<v-card class="mt-16 mb-16">
				<v-card-title class="px-8 pt-8">
					{{ $t("$dummyText.homePage.title") }}
				</v-card-title>
				<v-card-text class="pa-8">
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
};
</script>
