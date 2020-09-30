# Reusability and composition

We are going to review the different tools provided by Vue when it comes to scaling up the application and reusing parts of logic and views accross the application.

## Mixins

[Mixins](https://vuejs.org/v2/guide/mixins.html) allow you to create reusable feature sets for your Vue components. By declaring them via the `mixins` option, all the options of the mixin will be merged (merge) within the component options.

```js
// declare a mixin object
const helloMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log("hello from mixin!");
    }
  }
};

// declare a component that uses this mixin
const Component = Vue.extend({
  mixins: [helloMixin],
  created() {
    console.log("another created callback");
  }
});

let component = new Component();
```

::: tip
If there is a name conflict between a mixin option and the component option, the merge strategy applied is as follows:

- `data`, `methods`, `components` & `directives`: component options take precedence
- lifecycle hooks (eg `mounted`): triggered successively, mixin callbacks first
:::

## Custom directives

Vue allows you to declare your own [custom directives](https://vuejs.org/v2/guide/custom-directive.html) - the Vue-specific syntax that is used in component templates. This feature is often used by third-party libraries. Custom directives allow you to reuse business logic on multiple elements without using a dedicated component. However, be careful not to abuse them because it is difficult to keep track of all custom directives in a project, and they may conflict with future developments in Vue.

```js
// Register a global custom directive called 'v-focus'
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  }
});
```

## Plugins

Finally, Vue offers a [plugin system](https://vuejs.org/v2/guide/plugins.html) to add functionalities at a global level of the application. Again, this is a feature primarily used by third-party libraries and it should not be abused. Plugins can:

- add global mixins or new globally declared components
- add methods or properties globally to all components
- add custom directives / filters / transitions

```js
const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```

Most third-party Vue libraries use this plugin format for its convenience. This is the case of `vue-router` for example. Plugins are recognized as such and placed in their own category on the Vue UI interface.

## Composition API

::: tip
This section covers a new feature in Vue 3.0
:::

With time, some components of an application can become very sophisticated and contain more and more data, methods, computed, watchers and other options. They should be split into smaller components whenever possible, but sometimes this is not enough. In this situation, separating the declaration of a method and some related data, for example, can become problematic; ideally, we would want to group together these options because they are part of the same business logic, and not split them by type (method, data etc.). Variables intended to be used together are found very far apart from each other and spread throughout the code of large, complex components.

To overcome this problem, Vue 3 offers an alternative API to the component options object: the **Composition API**.

Let's take this example that use the Options API you already know:

```vue
<template>
  <button @click="increment">Clicked {{count}} {{label}}</button>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  computed: {
    label(){
      return this.count === 1 ? "time" : "times"
    }
  },
  methods: {
    increment(){
      this.count++;
    }
  }
}
</script>
```

This is how it can be rewritten using the Composition API:

```vue
<template>
  <button @click="increment">Clicked {{count}} {{label}}</button>
</template>

<script setup>
import { ref, computed } from "vue"

export const count = ref(0)
export const label = computed(() => count === 1 ? "time" : "times")
export const increment = () => count.value++
</script>
```

Besides the fact that the code is smaller, you can observe the following changes:
- with the special `setup` attribute of the `<script> `tag, data, computed, methods and other options can be declared anywhere in any order with the `export` keyword; no more need to group them by type
- the options are no longer attached to an object (`this.count`) but handled as independent variables; this involves declaring them via specific functions provided by Vue
- for data, it is necessary to encapsulate primitive values ​​such as the number `count` in an object structure in order to be able to modify them without changing their reference (mutation rather than reassignment); Vue proposes for this purpose the `ref` container which allows to mutate the primitive value via the `.value` property
- for objects used as data, they do not have this reassignment problem, and you can declare them with `reactive`

In short, with the Options API, an object containing all the options grouped by type is exported by default, while with the Composition API, the different options are exported individually. The Composition API takes its name from the fact that you can move some of its options into separate files, which you will reuse and compose between your different components. This way, it can supplant mixins and plugins, which may therefore disappear in the future if this writing style is adopted massively by the community.