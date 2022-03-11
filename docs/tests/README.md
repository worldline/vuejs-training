# Unit tests

## Why should I write automated tests ?

Automated testing is an essential step in software development, and bring many benefits:

- document how a component should behave
- detect and fix bugs sooner and more effectively
- save time spent manually testing
- encourage refactoring with complete peace of mind

## Different types of automated tests

- **Unit**: Checks that inputs to a given function, class, or composable are producing the expected output or side effects.
- **Component**: Checks that your component mounts, renders, can be interacted with, and behaves as expected. These tests import more code than unit tests, are more complex, and require more time to execute.
- **End-to-end**: Checks features that span multiple pages and make real network requests against your production-built Vue application. These tests often involve standing up a database or other backend.

## Choose your test runner

In order to test your application, you will need a test runner which will launch your test and collect the results. Vue team recommends [`Vitest`](https://vitest.dev/) for unit tests and simple components (no interaction), and [`Cypress`](https://on.cypress.io/component)  for more complex components and end-to-end testing.

The main difference between these two is execution context and execution time. Cypress runs tests in a real browser, which let you find some issues that Vitest can't spot: CSS issues, DOM events, failed network requests...

Vitest and Cypress should be already installed on your project if you followed the project init instructions correctly.

For more information and alternative tooling, please check [official documentation](https://vuejs.org/guide/scaling-up/testing.html)


## Vue Test Utils

To make it easier to write tests for Vue components, the team also provides [Vue Test Utils](https://vue-test-utils.vuejs.org/), the official library of unit test utilities for Vue.js. It comes with a [detailed guide](https://vue-test-utils.vuejs.org/) to help you set up your tests with custom configurations.

This library offers an API to test the Vue components, here are some of the most used methods:

- `mount`: creates a `Wrapper` that contains the mounted and rendered Vue component;
- `shallowMount`: like `mount`, it creates a `Wrapper` that contains the mounted and rendered Vue component, but with stubbed child components;
- `createLocalVue`: *(only for Vue 2)* returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.

The class `Wrapper` representing your mounted component offers method such as:

- `.html()`, `.text()`: get the HTML or text content
- `.find()`, `.findAll()`: search for HTML in the component
- `.setData()`, `.setMethods()`, `.setProps()`: override options in your component
- `.trigger()`: trigger events

::: tip
The methods described above make it possible to test most simple cases. For more information refer to the [official documentation](https://vue-test-utils.vuejs.org/).
:::

## Write your first test with Vitest and Vue Test Utils

By default, Vitest will run all tests in a `tests / unit` or`__tests__` folder. For example, the tests in `Film.spec.js` and`LoginForm.spec.js` will be spotted and run by Vitest here:

```
-- components
  |-- Film.vue
  |-- LoginForm.vue
  |-- __tests__
    |-- Film.spec.js
    |-- LoginForm.spec.js
```

Here is a basic example of what the tests of `LoginForm` could look like:

```js
import { mount } from '@vue/test-utils'
import LoginForm from '../LoginForm.vue'

test('render the form and check the title', () => {
  const wrapper = mount(LoginForm)

  const title = wrapper.get('h1')

  expect(title.text()).toBe('Authentication')
})
```

## Mocking

The **mocking** consists of isolating the test subject by replacing it with a mockup that simulate all the external bricks it interacts with. Thus, in case of failure of the test, it is ensured that the problem comes from the tested function and not from an external component (network, databases, third party, etc.).

Below are some examples to illustrate Vitest's mocking ability:

```js
import { test, vi } from 'vitest'

// Mocking a local function
import ApiService from '@/services/api.js'
import FilmService from '@/services/film.js'

test('Film search returns no results', done => {
    // mock the API to return a empty list
    ApiService.api = vi.fn(() => Promise.resolve([]))

    FilmService.search("something").then(results => {
        expect(results.length).toBe(0)
        done();
    })
}
```

## Practical work: Test the Film component

1. Create a unit test spec file for your `Film.vue` component.
2. In your test, mount the component, add a basic assertion, and run the tests.
3. Simulate the values ​​of a film and check the HTML rendering.
4. Add the calculation of the code coverage. What do you notice?
5. **Bonus**: Test the `LoginForm.vue` component, simulating HTTPS external calls as well as calls to the store and the router. Test the nominal and login error case.