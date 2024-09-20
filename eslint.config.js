var typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
var typescriptEslintParser = require('@typescript-eslint/parser')
var prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx'], // Các tệp cần kiểm tra
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            prettier: prettierPlugin
        },
        languageOptions: {
            parser: typescriptEslintParser,
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'prettier/prettier': [
                'warn',
                {
                    arrowParens: 'always',
                    semi: false,
                    trailingComma: 'none',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: true
                }
            ]
        }
    }
]
