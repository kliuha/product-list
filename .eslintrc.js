module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "vue/html-indent": ["error", "tab", {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "below"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },      
      "multiline": {
        "max": 1
      }
    }],
    "vue/multiline-html-element-content-newline": ["error", {
      "ignoreWhenEmpty": true,
      "allowEmptyLines": false
  }]
  },
};
