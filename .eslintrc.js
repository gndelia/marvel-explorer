module.exports = {
  "extends": "react-app",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "plugins": ["import", "jsx-a11y"],
  "rules": {
    "prefer-const": ["error", { "destructuring": "any", "ignoreReadBeforeAssign": false }],
    "no-const-assign": ["error"],
    "no-var": ["error"],
    "no-new-object": ["error"],
    "object-shorthand": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    "no-array-constructor": ["error"],
    "array-callback-return": ["error"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "prefer-template": ["warn"],
    "template-curly-spacing": ["error", "never"],
    "no-useless-escape": ["error"],
    "func-style": ["warn", "expression"],
    "wrap-iife": ["error", "outside"],
    "no-loop-func": ["error"],
    "prefer-rest-params": ["error"],
    "no-new-func": ["error"],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "no-param-reassign": ["error", { "props": true }],
    "prefer-spread": ["error"],
    "prefer-arrow-callback": ["error", { "allowNamedFunctions": false, "allowUnboundThis": false }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "arrow-parens": ["warn", "as-needed"],
    "arrow-body-style": ["error", "as-needed"],
    "no-confusing-arrow": ["error", { "allowParens": true }],
    "no-useless-constructor": ["error"],
    "no-dupe-class-members": ["error"],
    "no-duplicate-imports": ["error"],
    "import/no-mutable-exports": ["error", "always"],
    "import/prefer-default-export": ["error", "always"],
    "import/first": ["error", "always"],
    "import/no-webpack-loader-syntax": ["error", "always"],
    "no-iterator": ["error"],
    "no-restricted-syntax": ["error", "WithStatement"],
    "generator-star-spacing": ["error", { "before": false, "after": true }],
    "dot-notation": ["error", { "allowKeywords": false }],
    "no-undef": ["error", { "typeof": true }],
    "one-var": ["error", "never"],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": false }],
    "eqeqeq": ["error", "always"],
    "no-case-declarations": ["error"],
    "no-nested-ternary": ["error"],
    "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
    "brace-style": ["error", "1tbs"],
    "spaced-comment": ["error", "always"],
    "indent": ["error", 2],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "space-infix-ops": ["error", { "int32Hint": true }],
    "eol-last": ["error", "always"],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 1 }],
    "padded-blocks": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["error", { "code": 100, "ignoreUrls": true, "ignoreStrings": true }],
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "only-multiline"],
    "semi": ["error", "always"],
    "radix": ["error", "always"],
    "id-length": ["warn", { "min": 2, "properties": "never" }],
    "camelcase": ["error", { "properties": "always" }],
    "new-cap": ["error", { "newIsCap": true, "capIsNew": false, "properties": true }],
    "no-underscore-dangle": ["error", { "allowAfterThis": false, "allowAfterSuper": false }],
    "prefer-destructuring": ["warn", { "array": true, "object": true }, { "enforceForRenamedProperties": false }],
    "no-prototype-builtins": ["warn"],
    "no-eval": ["error", { "allowIndirect": false }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1, "maxBOF": 1 }],
    "no-trailing-spaces": ["error", { "skipBlankLines": false }],
    "no-implicit-coercion": ["error", { "boolean": false, "number": true, "string": true }],
    "consistent-this": ["error"],
    "react/prefer-es6-class": ["error"],
    "react/prefer-stateless-function": ["error"],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-closing-bracket-location": ["error", "after-props"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-multi-spaces": ["error", ],
    "react/jsx-tag-spacing": ["error"],
    "react/jsx-curly-spacing": ["error", { "when": "never", "allowMultiline" : false }],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-no-bind": ["error"],
    "react/require-render-return": ["error"],
    "react/sort-comp": ["error"],
    "react/no-is-mounted": ["error"],
    "react/no-string-refs": ["error"],
    "react/self-closing-comp": ["error"]        
  }
};