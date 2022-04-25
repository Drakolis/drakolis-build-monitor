module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["import", "prettier", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/exports-last": "error",
    "import/no-default-export": "error",
    "import/group-exports": "error",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
        semi: true,
        tabWidth: 2,
        endOfLine: "lf",
      },
    ],
  },
};
