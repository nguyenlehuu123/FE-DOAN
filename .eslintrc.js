// https://eslint.org/docs/user-guide/configuring

module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
      sourceType: "module"
    },
    globals: {
      "$": true,
      "jQuery": true
    },
    extends: [
      'eslint:recommended',
      // 'plugin:vue/essential',
      // 'plugin:vue/recommended',
      "@nuxtjs/eslint-config-typescript",
      // "plugin:nuxt/recommended",
      // "plugin:prettier/recommended",
      // "plugin:vue/vue3-essential",
      // 'plugin:vue/vue3-recommended'
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      "vue/html-self-closing": "off",
      // "vue/html-self-closing": [
      //   "error", {
      //     "html": {
      //       "void": "never",
      //       "normal": "never",
      //       "component": "any"
      //     },
      //     "svg": "any",
      //     "math": "any"
      //   }
      // ],
      "vue/require-default-prop": "off",
      "vue/require-prop-type-constructor": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-closing-bracket-spacing": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/valid-v-slot": "off",
      "vue/no-multiple-template-root": "off",
      "no-unused-vars": "warn",
      "no-debugger":"warn",
      "promise/param-names": "off",
      "dot-notation": "off",
      "object-shorthand": "off",
      "no-extra-boolean-cast": "off",
      "vue/attribute-hyphenation" : "off",
      "camelcase": "off"
    },
    env: {
      node: true,
    }
  };
  