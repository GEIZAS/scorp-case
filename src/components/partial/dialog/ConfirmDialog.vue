<template>
	<v-dialog v-bind:value="value" max-width="360">
		<v-card>
			<v-card-title class="headline">{{ currentTitle }}</v-card-title>

			<v-card-text>{{ content }}</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn text @click="handleClose">{{ currentNoButtonText }}</v-btn>
				<v-btn color="accent" text @click="handleConfirm">{{
					currentYesButtonText
				}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: [
		"value",
		"title",
		"content",
		"yesbuttontext",
		"nobuttontext",
		"onconfirm",
	],
	watch: {
		value: function(newValue) {
			if (newValue) {
				this.currentTitle =
					this.title == null || this.title == "" ? "Confirm" : this.title;
				this.currentYesButtonText =
					this.yesbuttontext == null || this.yesbuttontext == ""
						? this.$t("yes")
						: this.yesbuttontext;
				this.currentNoButtonText =
					this.nobuttontext == null || this.nobuttontext == ""
						? this.$t("cancel")
						: this.nobuttontext;
			}
		},
	},
	data() {
		return {
			currentTitle: "Confirm",
			currentYesButtonText: "Yes",
			currentNoButtonText: "Cancel",
		};
	},
	methods: {
		handleClose() {
			this.$emit("input", false);
		},
		handleConfirm() {
			this.$emit("input", false);
			if ({}.toString.call(this.onconfirm) === "[object Function]")
				this.onconfirm();
		},
	},
};
</script>
