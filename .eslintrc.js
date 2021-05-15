module.exports = {
  extends: "airbnb-typescript-prettier",
  rules: {
    "react/jsx-props-no-spreading": 0,
    "no-param-reassign": 1,
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["build/*", "/*.*"],
};
