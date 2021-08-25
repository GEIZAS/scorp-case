import Vue from "vue";
import { Setting, setSetting, getSetting, deleteSetting } from "../../data/ls";

const state = {
	isReady: true,
	userInfo:
		getSetting(Setting.userName) &&
		getSetting(Setting.userEmail) &&
		getSetting(Setting.userPassword)
			? {
					name: getSetting(Setting.userName),
					email: getSetting(Setting.userEmail),
					password: getSetting(Setting.userPassword),
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			: null,
	settings: {
		locale: getSetting(Setting.locale) || "tr",
	},
	progressBar: {
		visibility: false,
		color: "warning",
		animating: true,
	},
	snackbar: {
		visibility: false,
		message: "",
		color: "info",
		timeout: 3000,
	},
	alertDialog: {
		visibility: false,
		title: null,
		message: null,
	},
	confirmDialog: {
		visibility: false,
		title: "",
		message: "",
		confirmButtonText: "Yes",
		cancelButtonText: "Cancel",
		onConfirm: null,
	},
};

const getters = {
	isReady(state) {
		console.log("READY", state.settings.locale);
		return Boolean(
			state.settings.locale // add flag when need ready control
		);
	},
	userInfo(state) {
		return state.userInfo;
	},
	language(state) {
		return state.settings.locale;
	},
};

const mutations = {
	SET_LANGUAGE(state, language) {
		state.locale = language;
	},

	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo;
	},
	CLEAR_USER_INFO(state) {
		state.userInfo = null;
	},

	SET_PROGRESS_STATE(state, visibility) {
		state.progressBar.visibility = visibility;
	},
	SET_SNACKBAR_STATE(state, visibility) {
		state.snackbar.visibility = visibility;
	},
	SET_CONFIRM_DIALOG_STATE(state, visibility) {
		state.confirmDialog.visibility = visibility;
	},
};

const actions = {
	setLanguage({ commit }, language) {
		commit("SET_LANGUAGE", language);
		setSetting(Setting.locale, language);
		location.reload(); // TODO: without reload apply language change action
	},

	loginUser({ commit }, userInfo) {
		console.log("userInfo :>> ", userInfo);
		commit("SET_USER_INFO", userInfo);
		setSetting(Setting.userName, userInfo.name);
		setSetting(Setting.userEmail, userInfo.email);
		setSetting(Setting.userPassword, userInfo.password);
		location.reload();
	},
	logoutUser({ commit }) {
		commit("CLEAR_USER_INFO");
		deleteSetting(Setting.userName);
		deleteSetting(Setting.userEmail);
		deleteSetting(Setting.userPassword);
		location.reload();
	},

	showProgressBar({ commit }) {
		state.progressBar.color = "warning";
		state.progressBar.animating = true;
		commit("SET_PROGRESS_STATE", true);
	},
	hideProgressBar({ commit }) {
		commit("SET_PROGRESS_STATE", false);
	},
	showSnackbar({ commit }, { message, color, timeout }) {
		state.snackbar.message = message;
		state.snackbar.color = color ? color : "info";

		state.snackbar.timeout = timeout ? timeout : 3000;
		if (message && message !== "") commit("SET_SNACKBAR_STATE", true);
	},
	hideSnackbar({ commit }) {
		commit("SET_SNACKBAR_STATE", false);
	},
	showConfirmDialog(
		{ commit },
		{ title, message, confirmButtonText, cancelButtonText, onConfirm }
	) {
		state.confirmDialog.title = title;
		state.confirmDialog.message = message;
		state.confirmDialog.confirmButtonText = confirmButtonText
			? confirmButtonText
			: "Yes";
		state.confirmDialog.cancelButtonText = cancelButtonText
			? cancelButtonText
			: "Cancel";
		state.confirmDialog.onConfirm = onConfirm;
		if (
			state.confirmDialog.onConfirm &&
			{}.toString.call(state.confirmDialog.onConfirm) === "[object Function]"
		) {
			commit("SET_CONFIRM_DIALOG_STATE", true);
		}
	},
	hideConfirmDialog({ commit }) {
		state.confirmDialog.title = Vue.prototype.$t("confirm");
		state.confirmDialog.message = "";
		state.confirmDialog.onConfirm = null;
		commit("SET_CONFIRM_DIALOG_STATE", false);
	},
};

export { state, getters, mutations, actions };
