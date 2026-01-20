import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
    js.configs.recommended,
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
            // Только правила логики, без правил форматирования
            "no-unused-vars": ["warn", { "args": "none" }],
            "no-console": ["warn"],
            "prefer-const": "error",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "no-var": "error"
        }
    },
    prettierConfig, // Отключает все правила форматирования ESLint
    {
        plugins: {
            prettier: (await import("eslint-plugin-prettier")).default
        },
        rules: {
            "prettier/prettier": ["error", {}, { usePrettierrc: true }]
        }
    }
];