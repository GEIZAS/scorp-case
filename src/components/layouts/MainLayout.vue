<template>
	<div>
		<v-main>
			<router-view />
		</v-main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			logoUrl: "../../assets/logo.png",
		};
	},
	methods: {
		//
	},
};
</script>
