# Directives

The directives are the Vue-specific syntax elements that can be used in component templates.

## v-bind: Bind properties

Allows you to _bind_ an expression to the value of a property of an HTML element or component. Since this is the most commonly used directive, we usually use the shortened syntax `:property="value"`.

```html
<a v-bind:href="url">Link</a>

<a :href="url">Link</a>
<!-- shortened syntax -->
```

**Exercise: try to link the `src` and `width` attributes of the image**

```vue live
<template>
<h1>
    I {{likesVue ? "love" : "hate"}}
    <img src="" />
</h1>
</template>

<script>
export default {
  data(){
    return {
      likesVue: true,
      logo: 'https://vuejs.org/images/logo.png',
      logoWidth: 50
    }
  }
}
</script>
```

## Bind classes and styles

Several syntaxes are available to assign classes or CSS styles:

```html
<p :class="classAsString"></p>
<!-- "foo bar" -->
<p :class="classAsObject"></p>
<!-- { foo: true, bar: isBar } -->
<p :class="['foo', myOtherBarClass]"></p>
<p :class="{ foo: true, bar: isBar }"></p>

<p :style="styleAsString"></p>
<!-- "font-size: 48px" -->
<p :style="styleAsObject"></p>
<!-- { fontSize: "48px" } -->
<p :style="[baseStyles, overridingStyles]"></p>
<p :style="{ fontSize: size }"></p>
```

**Exercise: assign a class and a color to each ghost**

```vue live
<template>
<ol>
  <li>
    <span class="ghost">👻︎</span>
    I'm joyful and red
  </li>
  <li>
    <span class="ghost">👻︎</span>
    I'm jelly and green
  </li>
  <li>
    <span class="ghost">👻︎</span>
    I'm wobbly and blue
  </li>
</ol>
</template>

<script>
import "./ghosts.css";

export default {
  data(){
    return {
      ghost1: {
        anim: "joyful",
        style: "color: red"
      },
      ghost2: {
        anim: { jelly: true },
        style: { color: "green" }
      },
      ghost3: {
        isWobbly: true,
        isBlue: true
      }
    }
  }
}
</script>
```

## v-model: Forms and inputs

Allows you to bind the value of a form field to a component data item. It is a two-way binding: the variable is updated when the contents of the field change (typically by the user) and vice versa.

```html{3}
<label>
  What is your name ?
  <input v-model="name">
</label>

<p>Hello {{ name }} !</p>
```

<v-model-example />

**Exercise: use v-model on input, select, radio and checkbox**

```vue live
<template>
<div id="icecream-store">
  <h1>Icecream store</h1>

  <label>Quantity: <input type="number"></label>

  <label>Size:
    <select>
      <option value="100">Small</option>
      <option value="150">Medium</option>
      <option value="200">Giant</option>
    </select>
  </label>

  <label>Flavour:</label>
  <label><input type="radio" name="flavour" value="#F3E5AB">Vanilla</label>
  <label><input type="radio" name="flavour" value="#5B2F00" />Chocolate</label>
  <label><input type="radio" name="flavour" value="#DE0934" />Strawberry</label>

  <label><input type="checkbox"> Napkin</label>

  <IceCreams :quantity="quantity" :flavour="flavour" :size="size" :napkin="napkin" />
</div>
</template>

<style>label { display: block }</style>

<script>
import IceCreams from "./IceCreams.vue";

export default {
  components: { IceCreams },
  data(){
    return {
      quantity: 1,
      flavour: "#5B2F00",
      size: 150,
      napkin: true
    }
  }
}
</script>
```

## v-if: Conditions

Allows you to insert or not an element according to a condition. If you want the element not to be removed from the DOM but just visually hidden in CSS, use `v-show` instead.

The `v-else-if` and`v-else` directives work in the same way as their JavaScript equivalent and depend on the `v-if` condition of the element directly preceding them.

```html{1,4,7,11}
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="isTypeB">
  B
</div>
<div v-else>
  Not A nor B
</div>

<template v-if="loaded">
  <h1>Use a template</h1>
  <p>to put a condition on a group of elements</p>
</template>
```

**Exercise: use v-if, v-else and v-else-if to alternate faces according to the temperature**

```vue live
<template>
<div>
  <input type="range" min="0" max="40" v-model="temperature" />
  {{ temperature }} °C
  <span>🥵</span>
  <span>🥶</span>
  <span>😀</span>
</div>
</template>

<script>
export default {
  data(){
    return { temperature: 20 }
  }
}
</script>
```

## v-for: Loops

Generates lists of elements by repeating a template by iteration on an iterable value: typically an `Array`, the list of properties of an object, or a fixed number of iterations.

The directive declares local variables representing each iterated element and their index, which can be used in the template within the element.

```html
<span v-for="n in 10">{{ n }} ; </span>

<!-- items: ["apple","kiwi","mango"] -->
<ul> <li v-for="item in items">{{ item }}</li> </ul>
```

<v-for-example-1 />

::: warning
In addition to the `v-for` directive, you should bind a `key` property to a value that uniquely identifies each element of the list (an identifier, a reference, etc.).

This is not mandatory but helps Vue to better understand the changes that occur on a list (additions, deletions, sorts, etc.) and optimize the transitions between two states of the list.
:::

```html{5}
<!-- todos: [ { label: 'See list transitions', done: false },
              { label: 'Learn Vue', done: false },
              { label: 'Use v-for', done: true }, ... ] -->
<ul>
<!-- the list is ordered by putting completed tasks at the end -->
  <li v-for="(todo, index) in todos_after_sort" :key="todo.label">
    <label>
      <input type="checkbox" v-model="todo.done">
      Task {{ index }}: {{todo.label}}
    </label>
    - <i>{{todo.done ? "DONE !": "in progress..."}}</i>
  </li>
</ul>
```

<v-for-example-2 />

::: tip
To repeat a group of elements, use `v-for` on a `<template>`tag
:::

**Exercise: use two v-for loops to display all the contents of the basket**

```vue live
<template>
<div id="basket">
  <h1>In my basket:</h1>
  <ul>
    <li>
      <span>🍌</span>
      <span>🍌</span>
    </li>
  </ul>
</div>
</template>

<style>
li { list-style: none; font-size: 2rem; }
</style>

<script>
export default {
  data() {
    return {
       basket: [
        { type: '🍌', quantity: 2 },
        { type: '🍎', quantity: 4 },
        { type: '🍒', quantity: 6 },
        { type: '🍉', quantity: 1 },
      ]
    }
  }
}
</script>
```

## v-on: Events

Define an action to take when an event occurs. It can be a DOM event (`click`, `mouseover`, `focus`, etc.) or a custom event emitted by a child component.

```html{1,5}
<button v-on:click="counter += 1"> Click here! </button> This button has been
clicked {{ counter }} times.

<!-- shortened syntax: @event -->
<button @click="resetCounter($event)"> Reset </button>
```

<v-on-example />

::: tip
You can use the `$event` variable as a reference to the captured event
:::

**Exercise: use events to add a monkey when clicking the button, and make them open their eyes on mouse hover**

```vue live
<template>
<div>
  <span v-for="monkey in monkeys">
    {{ monkey.hasEyesOpen ? '🙉' : '🙈' }}
  </span>
  <br/>
  <button>Add monkey</button>
</div>
</template>

<style>span { font-size: 2rem; }</style>

<script>
export default {
  data(){
    return {
      monkeys: [
        { hasEyesOpen: false }
      ]
    }
  },
  methods: {
    addMonkey(){
      this.monkeys.push({ hasEyesOpen: false })
    }
  }
}
</script>
```

### Modifiers

Modifiers are suffixes used to slightly change the behavior of some directives: for example stop the propagation of a captured event with `v-on`. For more information, please refer to [official documentation](https://vuejs.org/v2/guide/events.html#Event-Modifiers).

```html
<!-- the propagation of the click event will be stopped -->
<a @click.stop="onThis">...</a>

<!-- submitting the form will not reload the page -->
<form @submit.prevent="onSubmit">...</form>

<!-- modifiers can be chained -->
<a @click.stop.once="doSomethingOnce">...</a>

<!-- also available: .tab, .delete, .esc, .space... -->
<input @keypress.enter="submit" />
```

## Practical work: Film card

1. In the authentication form, add two variables `email` and`password` in the `data` attribute of the component and use the `v-model` directive on the email and password fields to bind them.
2. Add another `loggedIn` variable initially set to `false`, then use the `v-on` directive to set it to `true` when the form is submitted.
3. Change the default behavior of the `submit` event of the authentication form to avoid reloading the page.
4. In `LoginForm.vue`, add the following HTML under the authentication form :

```html
<ul class="films">
  <li class="film card">
    <img
      class="poster"
      src="https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    />
    <p class="title">
      Titanic
      <span class="rating">★★★★</span>
    </p>
    <dl>
      <dt>Release date</dt>
      <dd>07/01/1998</dd>
      <dt>Director</dt>
      <dd>James Cameron</dd>
      <dt>Actors</dt>
      <dd>Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates</dd>
    </dl>
    <p class="plot">
      84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the
      story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine,
      Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in
      April 10th 1912, on a ship called Titanic when young Rose boards the
      departing ship with the upper-class passengers and her mother, Ruth DeWitt
      Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist
      named Jack Dawson and his best friend Fabrizio De Rossi win third-class
      tickets to the ship in a game. And she explains the whole story from
      departure until the death of Titanic on its first and last voyage April
      15th, 1912 at 2:20 in the morning.
    </p>
  </li>
</ul>
```

5. Use the `v-if` and `v-else` directives to display the authentication form and hide the films list when `loggedIn === false`, and vice versa.
6. Add the following variable in the `data` attribute of the component:

```js
films: [
  {
    title: "Titanic",
    released: "19 Dec 1997",
    director: "James Cameron",
    actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
    plot:
      "84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.",
    metascore: "75"
  },
  {
    title: "Blade Runner",
    released: "25 Jun 1982",
    director: "Ridley Scott",
    actors: "Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    plot:
      "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    metascore: "89"
  },
  {
    title: "The Shining",
    released: "13 Jun 1980",
    director: "Stanley Kubrick",
    actors: "Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    plot:
      "A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    metascore: "63"
  }
];
```

7. Using the `v-for` directive, repeat the `.film.card` element to display as many films as the `films` list.
8. Complete the card with data from each film using the directives and interpolation.
9. **Bonus:** the `metascore` property is a string that can take the value `"N/A"`, or a number between `"0"` and `"100"`. Use this property to display 1 to 5 stars next to each film title, when relevant.
