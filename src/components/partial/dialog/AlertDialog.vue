<template>
	<v-dialog v-bind:value="value" max-width="360">
		<v-card>
			<v-card-title class="headline">{{ currentTitle }}</v-card-title>

			<v-card-text>{{ content }}</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn text @click="handleClose">{{ currentButtonText }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ["value", "title", "content", "buttontext"],
	watch: {
		value: function(newValue) {
			if (newValue) {
				this.currentTitle =
					this.title == null || this.title == ""
						? this.$t("alert")
						: this.title;
				this.currentButtonText =
					this.buttontext == null || this.buttontext == ""
						? this.$t("ok")
						: this.buttontext;
			}
		},
	},
	data() {
		return {
			currentTitle: this.$t("alert"),
			currentButtonText: this.$t("ok"),
		};
	},
	methods: {
		handleClose() {
			this.$emit("input", false);
		},
	},
};
</script>
