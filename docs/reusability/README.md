# Reusability and composition

We are going to review the different tools provided by Vue when it comes to scaling up the application and reusing parts of logic and views accross the application.

## Composition API

::: tip
Composition API is a new feature of Vue 3.0, but can be used on Vue 2 projects with [@vue/composition-api](https://github.com/vuejs/composition-api) plugin.
:::

Over time, some of your components may become very huge, with lots of diffrrent data, methods, computed and other options. They should be split into smaller components whenever possible, but sometimes this is not enough. 

In this situation, some options intended to be used together may be found very far apart from each other and spread throughout the code of large, complex components. Ideally, we would want to group together these options because they are part of the same business logic, and not split them by type (method, data etc.). 

To overcome this, Vue 3 offers an alternative API for declaring components: the **Composition API**.

Let's take this example that use the Options API you already know:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul> 
</template>

<script>
export default {
  data () {
    return {
      todos: [],
      newTodo: ""
    }
  },
  computed: {
    hasNoLabel(){
      return this.newTodo.trim() === ""
    }
  },
  methods: {
    addTodo(){
      this.todos.push({ label: this.newTodo, done: false })
      this.newTodo = ""
    }
  }
}
</script>
```

This is how it can be rewritten using the Composition API:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul> 
</template>

<script setup>
import { ref, reactive, computed } from "vue"

const todos = reactive([])
const newTodo = ref("")
const hasNoLabel = computed(() => newTodo.value.trim() === "")

function addTodo(){
  todos.push({ label: newTodo.value, done: false })
  newTodo.value = ""
}
</script>
```

Besides the fact that the code is smaller, you can observe the following changes:
- with the `setup` attribute on the `<script> `tag, data, computed, methods and other options can be declared at script top level in any order ; no need to group them by type
- the options are no longer attached to an object (`this.todos`) but handled as independent variables; this involves declaring them via specific functions provided by Vue
- to be reactive, data now needs to be declared with `reactive` and `ref` methods
- `ref` is used to encapsulate primitive values such as string `newTodo` in a `{ value }` object structure so that you can change their value without changing their reference (mutation rather than reassignment) ; otherwise Vue would lose track of this variable (see [Reactivity section](../reactivity/)).
- data stored as object properties or array elements do not have this reassignment problem, so you can declare them with `reactive`

In short, with the Options API, an object containing all the options grouped by type is exported by default, while with the Composition API, the different options are exported individually. The Composition API takes its name from the fact that you can easily move some options into separate files, which you will reuse and compose between your different components. 

Composition API is now the best way to compose logic on Vue components, and has supplanted the previous solution called [mixins](https://vuejs.org/v2/guide/mixins.html), which may therefore disappear in the future if this writing style is adopted massively by the community.

## Custom directives

Vue allows you to declare your own [custom directives](https://vuejs.org/v2/guide/custom-directive.html) - the Vue-specific syntax that is used in component templates. This feature is often used by third-party libraries. Custom directives allow you to reuse business logic on multiple elements without using a dedicated component. However, be careful not to abuse them because it is difficult to keep track of all custom directives in a project, and they may conflict with future developments in Vue.


<VueVersionSwitch slot-key="custom-directive" />

::: slot custom-directive-vue2
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
:::

::: slot custom-directive-vue3
```js
// Register a custom directive called 'v-focus' on your app
app.directive("focus", {
  // When the bound element is inserted into the DOM...
  mounted: function(el) {
    // Focus the element
    el.focus();
  }
});
```
:::

## Plugins

Finally, Vue offers a [plugin system](https://vuejs.org/v2/guide/plugins.html) to add functionalities at a global level of the application. Again, this is a feature primarily used by third-party libraries and it should not be abused. Plugins can:

- add new globally declared components
- add methods or properties globally to all components
- add custom directives / filters / transitions

<VueVersionSwitch slot-key="custom-plugin" />

::: slot custom-plugin-vue2
```js
const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```
:::

::: slot custom-plugin-vue3
```js
const NotificationPlugin = {
  install(app){
    app.component('Notification', NotificationComponent);
    app.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```
:::

Most third-party Vue libraries use this plugin format for its convenience. This is the case of `vue-router` for example, which provides globally `<router-view>`, `$router` and `$route`.

