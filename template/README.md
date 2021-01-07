This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# cra-template-josh-ts
This is a template to quickly initialise a react project with, what I believe to be, best practices in mind. The technologies initialised are: React, TypeScript, ESlint, Prettier, Emotion CSS-in-JS, and Cypress automated testing. This will preconfigure ESLint, Prettier, and a tsconfig file, and also provides instruction on how to alter it to suite your needs. It also provides the useful VSCode extensions for this template. A `.env` file and a `cypress.env.json` file are also created, and automatically added to a `.gitignore` to ensure sensitive info is not committed.
## Relevant VSCode Extensions
Below is a list of the VSCode extensions recommended to get the most out of this template. Note, the ones with asterixis (\*) I consider *required*, or their equivalent if using a different IDE/editor.

-   Bracket Pair Colorizer (\*)
-   ESLint (\*)
-   GitLens (\*)
-   JavaScript and Typescript Nightly (\*)
-   Prettier (\*)
-   vscode-styled-components (\*)
-   ES7 React/Redux/GraphQL snippets
-   JavaScript (ES6) code snippets
-   Redux DevTools
-   Sass/Less/Stylus/Pug/Jade/Typesciprt/Javascript Compile hero process
-   Simple React Snippets

## CSS-in-JS

This project currently uses Emotion for CSS. This allows the creation of css stylings in the same file as Components to keep things scoped nicely.

The following comment is required at the top of every file which will use css-in-js, as this tells React to grab the JSX creation from emotion instead of React.createElement.

```js
/** @jsxImportSource @emotion/react */
```

This means we can create styles like this:

```js
import React from "react";
import { css } from "@emotion/react";

const hoverColor = "green";

const styling = css`
	color: red;
	&:hover {
		color: ${hoverColor};
		font-size: 20px;
	}
`;
```

Note, this will have syntax highlighting and autocomplete for the css when the above extensions are installed.

We then add the stylings as such using the `css` property we imported.

```js
const Another: React.FC = (): JSX.Element => {
	return (
		<div css={styling}>
			<h2>Another thing here.</h2>
		</div>
	);
};
```

## Package Manager

This uses Yarn as a package manager. If yarn has never been used, install it via npm first via `npm i -g yarn`, then you should have access to yarn.

-   `yarn add -D <package>` for dev dependencies
-   `yarn add <package>` for global deps
-   `yarn install` for installing the project
-   `yarn run <script>` to run a script in package.json.

## ESLint

This project uses ESLint as a linter, and Prettier as a code formatter. The `.eslintrc.js` file handles the settings for linting, currently it just uses the default "react-app" settings. However, this can be adjusted to adhere to different rules.

```js
module.exports = {
	extends: ["react-app", "react-app/jest"],
	rules: {
		quotes: ["error", "single"],
	},
};
```

The above the project would need single quotes for all strings rather than double, and would throw an error if doing so. If we wanted instead a warning (could still run), we would specify to "warn".

```js
module.exports = {
	extends: ["react-app", "react-app/jest"],
	rules: {
		quotes: ["warn", "single"],
	},
};
```

The rules can be found on eslint.org. To make ESLint ignore some files, we can use the `ignorePatterns` option in the `.eslintrc.js` file to give some files to ignore:

```js
module.exports = {
	extends: ["react-app", "react-app/jest"],
	ignorePatterns: ["src/**/__tests/"],
};
```

The above tells ESLint not to run on any file in a folder called `__tests__` that is in any subdirectory (or a direct child of) `src`.

```js
module.exports = {
	extends: ["react-app", "react-app/jest"],
	ignorePatterns: ["**/*.{js,jsx}"],
};
```

The above tells ESLint not to run on any file in any directory which has the extension of `.js` or `.jsx`.

Finally, we add TypeScript support via a couple plugins that are already installed, and should be installed with a `yarn install` command.

```js
module.exports = {
	extends: [
		"react-app",
		"react-app/jest",
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
};
```

Can also run `yarn run lint` to lint everything in `src`. This will show any warnings or errors that won't be autosolved by prettier (see below).

## Prettier

The `.prettierrc.js` file contains the formatting that prettier will automatically adhere to.

```js
module.exports = {
	tabWidth: 4,
	semi: true,
	singleQuote: false,
	useTabs: true,
};
```

These rules again can be found online. To get prettier and eslint to work, ensure the following properties are in the VSCode user settings.

```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ],
"javascript.updateImportsOnFileMove.enabled": "always",
```

This will cause prettier to format code on every save. This means that, if the Prettier settings and the ESLint/tsconfig are setup correctly, prettier should always cause no warnings to appear due to ESLint. But they probably still will as is the software life ¯\\_(ツ)\_/¯.

## Cypress Testing

This project using automated testing using Cypress. This can be run from the terminal `yarn run cypress open` or by running the `cy:dev` script with `yarn run cy:dev`. This opens the cypress test runner. The tests are from the `cypress/integration` folder. Each can be run, or all can be run at once. Before running the tests, ensure that the dev server is running on localhost:3000 in a separate terminal window. TO provide sensitive information in a secure way when doing automated testing (passwords etc), we use a `cypress.env.json` file, in which we store our env variables for cypress testing (note: we can also use a normal `.env` file and prefix our cypress env vars with `CYPRESS_` too).

```js
{
	"adminUsername": "admin",
	"adminPassword": "password444"
}

// OR in normal .env file
CYPRESS_adminUsername=admin
CYPRESS_adminPassword=password444
```

Then, in a cypress test, we would write:

```js
describe("First test", () => {
	it("Admin login works", () => {
		cy.visit("http://localhost:3000");
		cy.get("#login-username").type(Cypress.env(`adminUsername`));
		cy.get("#login-password").type(Cypress.env(`adminPassword`));
	});
});
```

This will get cypress to select the elements on the page with a `id` property of `login-username/login-password` respectively, and type in each of the values found in the env variables.
