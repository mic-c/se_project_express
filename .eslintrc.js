module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["utils/utils/customErrors.js"],
      rules: {
        "max-classes-per-file": "off",
      },
    },
    {
      files: ["utils/errorHandler.js"],
      rules: {
        "no-unused-vars": ["error", { argsIgnorePattern: "^next$" }],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
