<template>
	<v-app id="inspire">
		<router-view v-if="isReady" />
		<v-container v-if="!isReady" fill-height align-center justify-center>
			<v-progress-circular
				:size="100"
				:width="7"
				indeterminate
				color="accent"
			/>
		</v-container>

		<v-progress-linear
			v-if="$store.state.progressBar.visibility"
			:indeterminate="$store.state.progressBar.animating"
			:color="$store.state.progressBar.color"
			absolute
			top
		/>
		<confirm-dialog
			v-model="$store.state.confirmDialog.visibility"
			:title="$store.state.confirmDialog.title"
			:content="$store.state.confirmDialog.message"
			:confirmtext="$store.state.confirmDialog.confirmButtonText"
			:canceltext="$store.state.confirmDialog.cancelButtonText"
			:onconfirm="$store.state.confirmDialog.onConfirm"
		/>
		<v-snackbar
			v-model="$store.state.snackbar.visibility"
			bottom
			:color="$store.state.snackbar.color"
			:timeout="$store.state.snackbar.timeout"
		>
			{{ $store.state.snackbar.message }}
			<v-btn icon @click="$store.dispatch('hideSnackbar')">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ConfirmDialog from "@/components/partial/dialog/ConfirmDialog";

export default {
	components: {
		ConfirmDialog,
	},
	computed: {
		...mapGetters(["isReady"]),
	},
	data() {
		return {
			//
		};
	},
};
</script>
