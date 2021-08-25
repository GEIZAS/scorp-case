import ls from "local-storage";

const prefix = "scorp";

const setValue = (key, value) => ls.set(`${prefix}__${key}`, value);

const getValue = (key, defaultValue) =>
	ls.get(`${prefix}__${key}`) || defaultValue;

const deleteValue = (key) => ls.remove(`${prefix}__${key}`);

export const Setting = {
	locale: { key: "locale", type: "string" },
	userName: { key: "userName", type: "string" },
	userEmail: { key: "userEmail", type: "string" },
	userPassword: { key: "userPassword", type: "string" },
};

/**
 * @param {Object} value
 */
function setSettings(value) {
	setValue("settings", value);
}
function getSettings() {
	return getValue("settings", {});
}
function deleteSettings() {
	return deleteValue("settings", {});
}

/**
 * @param {Setting} key
 * @param {any} value
 */
export const setSetting = (setting, value) => {
	const settings = getSettings();
	if (setting.type === "string") settings[setting.key] = String(value);
	else if (setting.type === "bool") settings[setting.key] = Boolean(value);
	else if (setting.type === "number") settings[setting.key] = Number(value);
	else settings[setting.key] = value;
	setSettings(settings);
};

/**
 * @param {Setting} setting
 */
export const getSetting = (setting) => {
	return getSettings()[setting.key] || setting.default;
};

/**
 * @param {Setting} setting
 */
export const deleteSetting = (setting) => {
	return deleteSettings(setting);
};
