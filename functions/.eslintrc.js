module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
  "eslint.workingDirectories": [{ mode: "auto" }],
  parser: "@babel/eslint-parser",
};
