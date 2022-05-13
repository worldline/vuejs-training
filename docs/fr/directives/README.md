# Directives

Les directives sont les éléments de syntaxe propres à Vue utilisables dans les templates des composants.

## v-bind : Liaison de propriétés

Permet de lier (*bind*) à une variable la valeur d'une propriété d'un élément HTML ou d'un composant. Comme c'est la directive la plus couramment utilisée, on utilise généralement toujours la syntaxe raccourcie `:propriété="valeur"`.

```html
<a v-bind:href="url">Lien</a>

<a :href="url">Lien</a>  <!-- syntaxe raccourcie -->
```

**Exercice : essayez de lier les attributs `src` et `width` de l'image**

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

## Lier des classes et des styles

Plusieurs syntaxes sont proposées pour assigner des classes ou des styles CSS :

```html
<p :class="classAsString"></p>        <!-- "foo bar" -->
<p :class="classAsObject"></p>        <!-- { foo: true, bar: isBar } -->
<p :class="['foo', myOtherBarClass]"></p>
<p :class="{ 'foo': true, 'bar': isBar }"></p>

<p :style="styleAsString"></p>        <!-- "font-size: 48px" -->
<p :style="styleAsObject"></p>        <!-- { fontSize: "48px" } -->
<p :style="[baseStyles, overridingStyles]"></p>
<p :style="{ fontSize: size }"></p>
```

**Exercice : assignez une classe et une couleur à chaque fantôme**

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

## v-model : Formulaires et inputs

Permet de lier la valeur d'un champ de formulaire à une donnée du composant. C'est une liaison à double-sens, c'est-à-dire que la variable se met à jour quand le contenu du champ change (typiquement par l'utilisateur) et réciproquement.

```html{3}
<label>
  What is your name ?
  <input v-model="name">
</label>

<p>Hello {{ name }} !</p>
```
<v-model-example />

**Exercice : utilisez v-model sur les input, select, radio et checkbox**

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

## v-if : Conditions

Permet d'insérer ou non un élément selon une condition. Si vous souhaitez que l'élément ne soit pas retiré du DOM mais juste caché visuellement en CSS, utilisez `v-show` à la place.

Les directives `v-else-if` et `v-else` fonctionnent de la même façon que leur équivalent JavaScript et dépendent de la condition `v-if` de l'élément qui les précède directement.

```html{1,4,7,11}
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="isTypeB">
  B
</div>
<div v-else>
  Ni A ni B
</div>

<template v-if="loaded">
  <h1>Utiliser un template</h1>
  <p>pour mettre une condition sur un groupe d'elements</p>
</template>
```

**Exercice : utilisez v-if, v-else et v-else-if pour alterner les visages selon la température**

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

## v-for : Boucles

Permet de générer des listes d'éléments en répétant un template par itération sur une valeur itérable, typiquement un `Array`, la liste des propriétés d'un objet, ou encore un nombre fixe d'itérations.

La directive déclare des variables locales représentant chaque élément itéré et leur index, qui peuvent être utilisées dans le template à l'intérieur de l'élément.

```html
<span v-for="n in 10">{{ n }} ; </span>

<!-- items: ["apple","kiwi","mango"] -->
<ul> <li v-for="item in items">{{ item }}</li> </ul>
```

<v-for-example-1 />

::: warning
En complément de la directive `v-for`, liez une propriété `key` à une valeur qui identifie de façon unique chaque élément de la liste (un identifiant, une référence...).

Ce n'est pas obligatoire mais aide Vue à mieux comprendre les changements qui surviennent sur une liste (ajouts, suppressions, tris...) et optimiser les transitions entre deux états de la liste.
:::

```html{5}
<!-- todos: [ { label: 'See list transitions', done: false },
              { label: 'Learn Vue', done: false },
              { label: 'Use v-for', done: true }, ... ] -->
<ul>
<!-- la liste est ordonnée en mettant les tâches terminées à la fin -->
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
Pour répéter un groupe d'éléments, utiliser `v-for` sur une balise `<template>` contenant ces éléments.
:::

**Exercice : utilisez deux boucles v-for pour afficher tout le contenu du panier**

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

## v-on : Événements

Permet de définir une action à effectuer lorsqu'un évènement survient. Il peut s'agir d'un événement du DOM (`click`, `mouseover`, `focus`...) ou d'un événement personnalisé émis par un composant enfant.

```html{1,5}
<button v-on:click="counter += 1"> Click here! </button>
This button has been clicked {{ counter }} times.

<!-- syntaxe raccourcie : @event -->
<button @click="resetCounter($event)"> reset </button>
```

<v-on-example />

::: tip
Vous pouvez utiliser la variable `$event` comme référence à l'événement capturé (type [Event](https://developer.mozilla.org/fr/docs/Web/API/Event))
:::

**Exercice : utilisez les événements pour ajouter un singe au clic sur bouton, et leur faire ouvrir les yeux au passage de la souris**

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

### Modificateurs

Les modificateurs sont des suffixes permettant de modifier légèrement le comportement de certaines directives ; par exemple, stopper la propagation d'un événement capturé avec `v-on`. Pour en savoir plus, se référer à la [documentation officielle](https://fr.vuejs.org/v2/guide/events.html#Event-Modifiers).

```html
<!-- la propagation de l'événement click sera stoppée -->
<a @click.stop="onThis">...</a>

<!-- la soumission du formulaire ne rechargera plus la page -->
<form @submit.prevent="onSubmit">...</form>

<!-- les modificateurs peuvent être cumulés -->
<a @click.stop.once="doSomethingOnce">...</a>

<!-- également disponible : .tab, .delete, .esc, .space... -->
<input @keypress.enter="submit" />
```

## TP : Fiche d'un film

1. Sur le formulaire d'authentification, ajoutez deux variables `email` et `password` dans l'option `data` du composant et utilisez la directive `v-model` sur les champs email et password pour les lier.
2. Ajoutez une autre variable `loggedIn` initialement à `false`, puis utilisez la directive `v-on` pour l'assigner à `true` à la soumission du formulaire.
3. Modifier le comportement par défaut de l'évènement `submit` du formulaire d'authentification afin d'éviter le rechargement de la page.
4. Dans `LoginForm.vue`, ajoutez le HTML suivant sous le formulaire d'authentification :
```html
<ul class="films">
  <li class="film card">
    <img class="poster" src="https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg" />
    <p class="title">
      Titanic
      <span class="rating">★★★★</span>
    </p>
    <dl>
      <dt>Release date</dt><dd>07/01/1998</dd>
      <dt>Director</dt><dd>James Cameron</dd>
      <dt>Actors</dt><dd>Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates</dd>
    </dl>
    <p class="plot">
    84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.
    </p>
  </li>
</ul>
```
5. Utilisez les directives `v-if` et `v-else` pour afficher le formulaire d'authentification et cacher la liste des films quand `loggedIn === false`, et réciproquement.
6. Ajoutez la variable suivante dans l'option `data` du composant :
```js
films: [
  {
    title: 'Titanic',
    released: '19 Dec 1997',
    director: 'James Cameron',
    actors: 'Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
    plot: '84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.',
    metascore: '75'
  },
  {
    title: 'Blade Runner',
    released: '25 Jun 1982',
    director: 'Ridley Scott',
    actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
    metascore: '89'
  },
  {
    title: 'The Shining',
    released: '13 Jun 1980',
    director: 'Stanley Kubrick',
    actors: 'Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    plot: 'A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
    metascore: '63'
  }
]
```
7. A l'aide de la directive `v-for`, répétez l'élément `.film.card` pour afficher autant de films que contient la liste `films`
8. Complétez les données des cartes par celle de chaque film en utilisant les directives et l'interpolation
9. **Bonus :** la propriété `metascore` est une chaîne de caractères pouvant prendre la valeur `"N/A"`, ou un entier entre `"0"` et `"100"`. Servez-vous en pour afficher, quand c'est possible, de 1 à 5 étoiles à côté du titre de chaque film.