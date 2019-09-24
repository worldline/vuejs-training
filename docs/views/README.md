# Vue files

## Preview of a Vue project

The newly created Vue project has the following folders and files:

- `src`: the sources of your project
- `public`: all the content that will be directly put at the root of the web server, without going through Webpack
- `package.json`: the NPM package information of the project (version, dependencies, scripts etc.)
- `vue.config.js`: a configuration file for Vue CLI for this project

Other configuration files for the build tools can also be found here.

In the `src` folder, you have:

- `assets`: static resources (images, files) that will be imported by Webpack within your Vue components
- `components`: your Vue components (distributed by folder by "module" of your application)
- `views`: Vue components that will be attached to routes (URL) by vue-router
- `App.View`: Your root Vue component, which contains the entire application
- `main.js`: the entry point of the entire application's JavaScript code
- `router.js`: vue-router configuration and the list of declared routes

Later, you may need to create additional folders in `src` as needed. For example, a `services` folder is commonly found which contains business logic bricks with functions used in several components. Or a `utils` folder to store various utility functions in JavaScript instead of repeating them in multiple places.

## Single File Components *.vue

- A Vue.js application is divided into several components
- A component is a `.vue` file
- A `.vue` file consists of three optional elements:
    - the `<template>` tag contains the HTML code of the component
    - the `<script>` tag (optional) contains the JavaScript code of the component
    - the `<style>` tag (optional) contains the CSS style of the component

```vue
<template>
  <div>
    <span>Hello {{who}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      who: 'World'
    }
  }
}
</script>

<style scoped>
span {
  color: blue;
}
</style>
```

The script part of the component must export an object with the properties of the component by default. Here we find the property `name`, useful for identifying the component during debugging; and the data property that sets the initial data of the component. The other properties will be discussed in the Components section.

::: tip
Why do you think the `data` property of a component must be a function?
:::

## Work with components

The Vue components described above are the building blocks in which you will design your web interfaces. A web application is made of small reusable components, embedded in higher level components to form the layout, the arrangement of your elements on the page. This structure can be described as a **component tree**.

![Component tree](../assets/component-tree.png)

To link the components together, the child components are declared in the parent component template, using their name as a tag. A component can be reused as many times as necessary by including it as follows:

```vue
<template>
  <div>
    <my-component></my-component>
  </div>
</template>

<script>
import MyComponent from '~/components/MyComponent.vue'

export default {
  name: 'ParentComponent',
  components: {
    MyComponent
  }
}
</script>
```

::: tip
The `components` attribute in the script part of the component. The child components used in the template must be declared as shown, but you can also declare components globally on your Vue application, so you can use them everywhere without having to declare them manually.
:::

In your Vue project, see how the `HelloWorld` component has been integrated into the` App` root component.

## Text interpolation in templates

::: v-pre
The simplest way to insert data dynamically into your components is through text interpolation, using the `{{myVariable}}` syntax. Inside double curly braces, you can specify any valid JavaScript expression:
:::

```vue
<template>
  <p>Order ref. {{ orderReference }} - Total: {{ price.toFixed(2)+'€' }}</p>
</template>

<script>
  export default {
    name: 'OrderInfo',
    data(){
      return {
        orderReference: 'ABCXYZ',
        price: 17.3
      }
    }
  }
</script>
```

Interpolation only works on textual content of elements. You can not use it to change the value of HTML attributes or to insert HTML code. For this, you will need to resort to *directives*, which will see in the following section.

## Practical Work: Your first component

1. Add the CSS stylesheet that will serve as basis for all the practical work, downloadable here: [stylesheet.css](https://worldline.github.io/vuejs-training/stylesheet.css); put it in the `src` folder and include it in the project with `import './stylesheet.css'` in the script part of `App.vue`.

2. Create a new component `LoginForm.vue` containing the following authentication form:

```html
<div id="login-form">
<form>
  <h1>Authentication</h1>
  <p>Fill out this form to login.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Enter your email" id="email" name="email" required>

  <label for="psw"><b>Password</b></label>
  <input type="password" placeholder="Enter your password" id="psw" name="psw" required>

  <p><button type="submit">Login</button></p>
</form>
</div>
```

3. Delete the existing contents of the `App.vue` component template, and display the `LoginForm.vue` component instead with `<login-form />`. You will also need to declare `LoginForm` in the `components` attribute of the `App` component.

4. Complete the `LoginForm.vue` file to declare the name of the component, and a` data` containing a `title` property. Then use the text interpolation in the template to pass the title of the form *"Authentication"* using the variable `title`.