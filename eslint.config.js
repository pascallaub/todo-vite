import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  { languageOptions: { globals: globals.browser } },
  {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": ["react", "prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }  
];
