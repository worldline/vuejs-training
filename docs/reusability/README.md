# Reusability and composition

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
    Vue.directive('notify', NotificationDirective):
  }
}

Vue.use(NotificationPlugin)
```

Most third-party Vue libraries use this plugin format for its convenience. This is the case of `vue-router` for example. Plugins are recognized as such and placed in their own category on the Vue UI interface.
