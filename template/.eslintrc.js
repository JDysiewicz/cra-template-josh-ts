module.exports = {
	extends: [
		"react-app",
		"react-app/jest",
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	ignorePatterns: ["src/**/__tests__", "cypress"],
};
