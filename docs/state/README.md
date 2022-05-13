# State management

We saw in the previous section how parent and child components communicate. However, as applications grow and become more complex, components that are far away from each other in the component tree may have to manipulate the same data. It then becomes very tedious to make them share common data references. That's why there are more or less complex _state management_ solutions.

## Why a state management solution ?

![Problem with shared props on multiple views](../assets/intro-state-management.png)

- because propagating some data ad `props` of a parent component to the grandchildren and great-grandchildren components quickly becomes tedious
- to be able to share information between different component trees
- to delegate data management to a service reachable from all components
- to be able to persist the data automatically (in `localStorage` for example)
- to log application states, or rollback to a previous state with a _Cancel_ feature
- to help debug, log, monitor or send error reports

## Data shared by reference

The simplest solution to the state management problem is to store the data within one or more objects declared in their own module. All components that want to manipulate this data can then import the object and modify its content while working on the same reference.

```js
/** stores/state.js **/
export const state = {
  user: null,
  loggedIn: false
};
```

```js
/** LoginForm.vue **/
import state from "stores/state.js"

export default {
  data: { state },
  methods: {
      login(){
          this.state.user = "John Smith"
          this.state.loggedIn = true
      }
  }
}
```

::: tip
Note that we have intentionally declared `data` as an object and not a function, so that instances of the component use the same shared data reference.

However, we can also mix local data and shared data:

```js
data(){
  return {
    sharedState: state,
    privateState: { ... }
  }
}
```

:::

This solution can do the job in many cases, but quickly shows its limitations when debugging with many different components interacting with the same data at the same time. Indeed, mutations of state objects are not logged anywhere, so it is difficult to find the origin of a bug.

## Store and controled mutations

A slightly more advanced pattern is to declare a _store_ object that encapsulates the state object and serves as a control interface. The state object is not directly reachable from the outside by reference, but the store provides methods to interact with: typically a getter / setter. We can then add in these methods other features for debugging, monitoring, performance measurement etc.

```js
/** stores/store.js **/
import { reactive } from 'vue'

const state = reactive({ message: "hello" }); // no export for state

export const store = {
  get(prop) {
    if (DEBUG_MODE) console.log("[store] get", prop);
    return state[prop];
  },
  set(prop, value) {
    if (DEBUG_MODE) console.log("[store] set", prop);
    state[prop] = value;
  }
};
```

```vue
<!-- MyComponent.vue -->
<script>
import store from "@/stores/store.js";

export default {
  data() {
    return {
      privateState: {},
      store
    };
  },
  computed: {
    message() {
      return this.store.get("message");
    }
  },
  methods: {
    exit() {
      this.store.set("message", "bye!");
    }
  }
};
</script>
```

## Pinia

Once you have a store pattern, it is tempting to enrich it with many features and take advantage of the centralization of state mutations. This has been a field of research for many development teams, especially outside Vue ecosystem, for example the work on the _Flux_ architecture done by the React team.

The Vue community went through the same process and came to [Vuex](https://vuex.vuejs.org/), a proposal for an official state management solution for Vue. After Vue 3 release and the introduction of the [Composition API](/reusability), a new library called [Pinia](https://pinia.vuejs.org/) replaced VueX as the official recommendation. That's what we are going to use here.

Pinia is the culmination of this centralized store pattern. It is the official state management solution provided by the Vue team. Pinia will not necessarily find its place in all Vue projects, but it is a very efficient tool in large applications that handle a lot of data.

Pinia works with the following concepts:

- the **state**, which holds the *data* of your store
- the **actions**, which are used to mutate the store, equivalent to *methods* in components
- the **getters**, which are helpers to access to your store data, equivalent to *computed*

The mutated state updates reactively all the views that use it, regardless of their depth in the component tree.

## Practical work: Implement a Pinia store

1. Install `pinia` and `pinia-plugin-persistedstate` dependencies that will be used to persist store state.

<VueVersionSwitch slot-key="install-pinia" />

::: slot install-pinia-vue2
```bash
npm install pinia pinia-plugin-persistedstate @vue/composition-api
```
:::

::: slot install-pinia-vue3
```bash
npm install pinia pinia-plugin-persistedstate
```
:::

2. Create a Pinia store for the session by creating a `src/stores/session.js` file with following content:

```js
import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      loggedIn: false
    }
  },
  actions: {
    login({ user }) {
      this.loggedIn = true
      this.user = user
    }
  }
})
```

3. Declare the store in your application by completing the `main.js` file like this:

<VueVersionSwitch slot-key="app-store" />

::: slot app-store-vue2
```js{10}
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI) // for Pinia and Vue 2 compat
Vue.use(PiniaVuePlugin)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  render: h => h(App),
  pinia
}).$mount('#app')
```
:::

::: slot app-store-vue3
```js{8}
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .mount('#app')
```
:::

4. In the application code, retrieve the `loggedIn` variable from the store with `useSession()`

::: tip
The `mapState` and `mapActions` are helpers provided with Pinia that can be used to shorten the code by easily linking store data and actions to computed and methods.

```js
import { useSession } from "@/stores/session"
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    // bind this.loggedIn to useSession().loggedIn
    ...mapState(useSession, ["loggedIn"])
  },
  methods: {
    // bind this.login to useSession().login  
    ...mapActions(useSession, ["login"])
  }
}
```

:::

5. In `LoginForm.vue`, on form submit, check if the user has entered the email address `test@test.com` and the password `test1234`. If so, trigger the `login` action for the user `test`.

:::tip
Invoking an action from a component is done by calling it as a method of the store:

```js
const session = useSession()
session.login({ user: { firstname: "John", lastname: "Smith" } });
```
:::

6. Login with the identifiers mentioned above, check that the navigation to the search form is working properly, then refresh the page.

**Question**: Why don't we return to the login form after refreshing the page ?

7. If the user has entered wrong credentials in the login form, display an error message below the login button. To help you, you can declare an additional `error` string in the component's `data`.

8. **Bonus**: Code a `logout` action and add a logout button in `App` component that invokes this action. Display the name of the logged in user next to this button.
