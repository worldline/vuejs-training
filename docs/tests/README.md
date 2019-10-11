# Unit tests

## Why should I test?

Unit testing is an essential step in software development. These tests are used to execute each code unit isolated from the rest of the software. They bring many benefits:

- document how a component should behave
- detect and fix bugs sooner and more effectively
- save time spent manually testing
- encourage refactoring with complete peace of mind

## Choose your test runner

In order to test your application, you will need a test runner which will launch your test and collect the results. [Vue CLI](https://cli.vuejs.org/) has built-in options to set up unit tests on your Vue project with a choice between several runners. During this training, we suggest to use [Jest](https://jestjs.io/), a complete test runner, popular, with little configuration necessary, and which provides a basic but sufficient assertion library for most uses.

[Jest](https://jestjs.io/) offers out of the box:
- launching tests in parallel;
- generating a test coverage report;
- easy *mocking*;
- simple assertions and readable tests;
- a complete command line interface.

::: tip
As an alternative to Jest, the Vue team also offers [mocha-webpack](https://github.com/zinserjan/mocha-webpack), a wrapper between Mocha and Webpack. This solution, however, may require a little more initial configuration.
:::

## Write your first test with Jest

By default, Jest will run all tests in a `tests / unit` or` __tests__` folder. For example, the tests in `Movie.spec.js` and` LoginForm.spec.js` will be spotted and run by Jest here:

```
-- components
  |-- Film.vue
  |-- LoginForm.vue
  |-- __tests__
    |-- Film.spec.js
    |-- LoginForm.spec.js
```

Some examples to illustrate the global methods proposed by Jest:

```js
// Run this once before all the tests - beforeAll(fn, timeout)
beforeAll(async () => { await createDatabase() }, 500)

// Run this once after all the tests - afterAll(fn, timeout)
afterAll(async () => { await deleteDatabase() }, 500)

// Run this once before each test - beforeEach(fn, timeout)
beforeEach(() => { initState() }, 500)

// Run this once after each test - beforeEach - afterEach(fn, timeout)
afterEach(async () => { await resetState() }, 500)

// A unit test - 'test' keyword can be use instead of 'it'
// Keywords .skip, .only et .each are available
test('should do something...', () => {
  expect(add(1, 2).toBe(3)
})

// Easily test multiple cases with the keyword .each
test.each`
  a | b | expected
  1 | 1 | 2
  1 | 2 | 3
  2 | 1 | 3
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected)
})

// Group tests - describe(name, fn)
// Keywords .skip, .only et .each are available
describe('Film Card', () => {
    test(...)
    test(...)
    ...
 })
```

## Mocking

The **mocking** consists of isolating the test subject by replacing with a simulator all the external bricks with which he interacts. Thus, in case of failure of the test, it is ensured that the problem comes from the tested function and not from an external component (network, databases, third party, etc.).

Below are some examples to illustrate Jest's mocking ability:

```js
// Mocking a local function
import ApiService from '@/services/api.js'
import FilmService from '@/services/film.js'

test('Movie search returns no results', done => {
    // mock the API to return a empty list
    ApiService.api = jest.fn(() => Promise.resolve([]))

    FilmService.search("zzzz").then(results => {
        expect(results.length).toBe(0)
        done();
    })
}
```

```js
// Mocking of an external library like axios
jest.mock('axios');

test('user login', () => {
  axios.get.mockResolvedValue({ token: "123456" });

  return UserService.login({ name: "Bob", password: "p4ssw0rd" })
    .then(response => expect(response.token).toEqual("123456"));
});
```

## Vue Test Utils

To make it easier to write tests for Vue components, the team also provides [Vue Test Utils](https://vue-test-utils.vuejs.org/), the official library of unit test utilities for Vue.js. It comes with a [detailed guide](https://vue-test-utils.vuejs.org/) to help you set up your tests with custom configurations.

For example on the following component:
```vue
<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  method: {
    increment() {
      this.count++
    }
  }
}
</script>
```

Let's create a test that checks the content of the component:

```js
import { mount } from '@vue/test-utils'
import Counter from './counter'

describe('Counter', () => {
  // This "wrapper" contains the mounted component as well as methods to test it
  const wrapper = mount(Counter)

  test('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // Simple check of presence of elements
  test('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
```

This library offers an API to test the Vue components, here are some of the most used methods:

- `mount`: creates a `Wrapper` that contains the mounted and rendered Vue component;
- `shallowMount`: like `mount`, it creates a `Wrapper` that contains the mounted and rendered Vue component, but with stubbed child components;
- `createLocalVue`: returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.

The class `Wrapper` representing your mounted component offers method such as:

- `.html()`, `.text()`: get the HTML or text content
- `.find()`, `.findAll()`: search for HTML in the component
- `.setData()`, `.setMethods()`, `.setProps()`: override options in your component
- `.trigger()`: trigger events

::: tip
The methods described above make it possible to test most simple cases. For more information refer to the [official documentation](https://vue-test-utils.vuejs.org/).
:::

## Jest + Vue Test Utils = 🚀

The combination of Jest with Vue Test Utils makes it possible to test complex operations such as the store, the router or external calls.

The following example shows how to simulate store calls as well as user events such as clicks or input:

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '../../../src/components/Actions'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions, store;

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({ actions })
  })

  test('dispatches "actionInput" when input event value is "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled()
  })

  test('does not dispatch "actionInput" when event value is not "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'not input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })

  test('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled()
  })
})
```

## Practical: Test the Film component

1. Create a unit test spec file for your `Movie.vue` component.
2. In your test, mount the component, add a basic assertion, and run the tests.
3. Simulate the values ​​of a movie and check the HTML rendering.
4. Add the calculation of the code coverage. What do you notice?
5. **Bonus**: Test the `LoginForm.vue` component, simulating HTTPS external calls as well as calls to the store and the router. Test the nominal and login error case.