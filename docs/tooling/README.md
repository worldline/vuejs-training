# Tooling

## Tools to install

### Node.js

Install [Node.js](https://nodejs.org/) (preferably latest stable version). You can use [nvm](https://github.com/creationix/nvm) if you need to manage different versions of Node.js on your local machine.

### Visual Studio Code and Vetur/Volar

During the training you will need a solid JavaScript code editor.

We recommend [Visual Studio Code](https://code.visualstudio.com/), a fairly lightweight free editor that is now very popular in the JavaScript community.

VS Code has many extensions to enrich the experience. For Vue projects, we recommende these extensions which provides syntax highlighting and autocompletion for Vue components files:

<VueVersionSwitch slot-key="vscode-extension" />
::: slot vscode-extension-vue2
For Vue 2, use this extension: [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
:::

::: slot vscode-extension-vue3
For Vue 3, use this extension: [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
:::

### Vue Devtools

Download the browser extension [vue-devtools](https://github.com/vuejs/vue-devtools) available on Chrome, Firefox or as a standalone application. This will help you debug your code during the practical work.

## Vue.js without build step (runtime only)

It is possible to use Vue.js without a compilation step. Vue is basically a JavaScript library that can be imported and used directly on clients' browsers.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello Vue</title>
    <script src="https://unpkg.com/vue"></script>
  </head>
  <body>
    <div id="app">
      <h1>Hello {{name}} !</h1>
    </div>

    <script>
      const vm = new Vue({ el: "#app", data: { name: "Vue" } });
    </script>
  </body>
</html>
```

However, this usage quickly finds its limits, and the development tools that come with Vue projects prove to be very valuable over time. But this can be useful if you want to integrate Vue components into a project made with another framework, or if you want to make a quick prototype.

## Practical Work: Create your first project

You can use either **Vue 3** or **Vue 2** for this training.

Get into your workspace and create a project called `search-films` by running the following command:

<VueVersionSwitch slotKey="npm-init" />

::: slot npm-init-vue3
```bash
npm init vue@latest
```
:::

::: slot npm-init-vue2
```bash
npm init vue@2
```
:::

**search-films** being the name of the directory in which our project will be created.

Choose the following configuration:

```bash
✔ Project name: search-films
✔ Add TypeScript? No
✔ Add JSX Support? No
✔ Add Vue Router for Single Page Application development? No
✔ Add Pinia for state management? No
✔ Add Vitest for Unit Testing? ... Yes
✔ Add Cypress for testing? Yes
✔ Add ESLint for code quality? ... Yes
✔ Add Prettier for code formatting? ... Yes

Scaffolding project in ./search-films...
Done.
```

We recommend you use TypeScript for medium to large business applications, but in the context of this training session, we are going to stick with JavaScript. We pick **No** option for the tools we are going to manually add to our project later.

At the end of the installation, a folder has been created for your project. Navigate to the directory of your project and install the dependencies:

```bash
cd search-films
npm install
```

### Work in developer mode

To work on the application and test it live, run the following command:

```bash
npm run dev
```

Your application is accessible on [localhost:3000](http://localhost:3000/) (default port if available).

In **Visual Studio Code**, open the project folder and browse through the different files to visualize of the project tree.

### Build for production

You can at any time package your project for production by running:

```bash
npm run build
```

This command will compile your project using **Vite** and **Rollup** in production mode. These tools are pre-configured to output highly optimized static assets for production: they will transform your sources into a small number of _bundles_, optimized and compressed JS and CSS files, and put them in the `/dist` folder of your project. You can then deploy this folder on a file server such as Apache or nginx.

::: tip

After a build, you can quickly test the resulting app with `npm run preview`. Other basic commands and instructions are listed in the README.md generated at the root of the project.

:::

### Project configuration

You can configure all this tooling in multiple ways,  by using dedicated configuration files. For example, to change the port used by the development server, create a `vite.config.js` file at the root of the project and put the following content in it:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080
  }
})
```

Your project will now be accessible on port 8080 in developer mode. See [Vite Configuration Reference](https://vitejs.dev/config/) for more information about the available options.
