module.exports = {
  root: true,
  extends: ["expo", "expo/typescript"],
  rules: {
    camelcase: ["warn", { properties: "never", ignoreDestructuring: true }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports" }
    ]
  }
};
