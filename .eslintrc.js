module.exports = {
	extends: "airbnb-base",
	rules: {
		indent: [2, "tab"],
		"linebreak-style": 0,
		"no-console": "off"
	},
	env: {
		es6: true,
		node: true,
		browser: true
	},
	parserOptions: {
		sourceType: "module"
	},
	extends: "eslint:recommended"
};
