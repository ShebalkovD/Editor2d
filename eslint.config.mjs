// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            "indent": ["error", 4],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "single", { "avoidEscape": true }],
            "semi": ["error", "always"],
            "no-unused-vars": ["warn", { "args": "none" }],
            "no-console": ["warn"],
            "prefer-const": "error",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "arrow-spacing": "error",
            "no-var": "error",
            "brace-style": ["error", "1tbs"]
        }
    }
];