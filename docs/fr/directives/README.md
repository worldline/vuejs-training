# Directives

Les directives sont les éléments de syntaxe propres à Vue utilisables dans les templates des composants.

## v-bind: Liaison de propriétés

Permet de lier (*bind*) à une variable la valeur d'une propriété d'un élément HTML ou d'un composant. Comme c'est la directive la plus couramment utilisée, on utilise généralement toujours la syntaxe raccourcie `:propriété="valeur"`.

```vue
<a v-bind:href="url">Lien</a>

<a :href="url">Lien</a>  <!-- syntaxe raccourcie -->
```

[Exercice: essayez de lier les attributs `src` et `width` de l'image](https://codepen.io/sylvainpv/pen/LBgqbq?editors=1010)

## Lier des classes et des styles

Plusieurs syntaxes sont proposées pour assigner des classes ou des styles CSS:

```vue
<p :class="classAsString"></p>        <!-- "foo bar" -->
<p :class="classAsObject"></p>        <!-- { foo: true, bar: isBar } -->
<p :class="['foo', myOtherBarClass]"></p>
<p :class="{ 'foo': true, 'bar': isBar }"></p>

<p :style="styleAsString"></p>        <!-- "font-size: 48px" -->
<p :style="styleAsObject"></p>        <!-- { fontSize: "48px" } -->
<p :style="[baseStyles, overridingStyles]"></p>
<p :style="{ fontSize: size }"></p>
```

[Exercice: assignez une classe et une couleur à chaque fantôme](https://codepen.io/sylvainpv/pen/qyJgLe?editors=1010)

## v-model: Formulaires et inputs

Permet de lier la valeur d'un champ de formulaire à une donnée du composant. C'est une liaison à double-sens, c'est-à-dire que la variable se met à jour quand le contenu du champ change (typiquement par l'utilisateur) et réciproquement.

```vue{3}
<label>
  What is your name ?
  <input v-model="name">
</label>

<p>Hello {{ name }} !</p>
```
<v-model-example />

[Exercice: utilisez v-model sur les input, select, radio et checkbox](https://codepen.io/sylvainpv/pen/rrqEMg?editors=1010)

## v-if: Conditions

Permet d'insérer ou non un élément selon une condition. Si vous souhaitez que l'élément ne soit pas retiré du DOM mais juste caché visuellement en CSS, utilisez `v-show` à la place.

Les directives `v-else-if` et `v-else` fonctionnent de la même façon que leur équivalent JavaScript et dépendent de la condition `v-if` de l'élément qui les précède directement.

```vue{1,4,7,11}
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

[Exercice: utilisez v-if et v-else pour alterner les visages selon la condition](https://codepen.io/sylvainpv/pen/bjmXXV?editors=1010)

## v-for: Boucles

Permet de générer des listes d'éléments en répétant un template par itération sur une valeur itérable, typiquement un `Array`, la liste des propriétés d'un objet, ou encore un nombre fixe d'itérations. 

La directive déclare des variables locales représentant chaque élément itéré et leur index, qui peuvent être utilisées à l'intérieur de l'élément.

```vue
<span v-for="n in 10">{{ n }} ; </span>

<!-- items: ["pomme","kiwi","mangue"] -->
<ul> <li v-for="item in items">{{ item }}</li> </ul>
```

<v-for-example-1 />

::: warning
En complément de la directive `v-for`, liez une propriété `key` à une valeur qui identifie de façon unique chaque élément de la liste (un identifiant, une référence...). 

Ce n'est pas obligatoire mais aide Vue à mieux comprendre les changements qui surviennent sur une liste (ajouts, suppressions, tris...) et optimiser les transitions entre deux états de la liste.
:::

```vue{5}
<!-- todos: [ { label: 'Apprendre Vue', done: false }, 
              { label: 'Utiliser v-for', done: true }, ... ] -->
<ul>
<!-- la liste est ordonnée en mettant les tâches terminées à la fin -->
  <li v-for="(todo, index) in todos_after_sort" :key="todo.label">
    <label>
      <input type="checkbox" v-model="todo.done">
      Task {{ index }} : {{todo.label}}
    </label>
    - <i>{{todo.done ? "DONE !": "in progress..."}}</i>
  </li>
</ul>
```

<v-for-example-2 />

::: tip
Pour répéter un groupe d'éléments, utiliser `v-for` sur une balise `<template>`
:::

[Exercice: utilisez deux boucles v-for pour afficher tout le contenu du panier](https://codepen.io/sylvainpv/pen/RBqbBW?editors=1010)

## v-on: Événements

Permet de définir une action à effectuer lorsqu'un évènement survient. Il peut s'agir d'un événement du DOM (`click`, `mouseover`, `focus`...) ou d'un événement personnalisé émis par un composant enfant.

```vue{1,5}
<button v-on:click="counter += 1"> Cliquez ici ! </button>
Ce bouton a été cliqué {{ counter }} fois.

<!-- syntaxe raccourcie: @event -->
<button @click="resetCounter($event)"> Remettre à zéro </button>
```

<v-on-example />

::: tip
Vous pouvez utiliser la variable `$event` comme référence à l'événement capturé
:::

[Exercice: utilisez les événements pour ajouter un singe au clic sur bouton, et leur faire ouvrir les yeux au passage de la souris](https://codepen.io/sylvainpv/pen/NBEKQw?editors=1010)

### Modificateurs

Les modificateurs sont des suffixes permettant de modifier légèrement le comportement de certaines directives ; par exemple, stopper la propagation d'un événement capturé avec `v-on`. Pour en savoir plus, se référer à la [documentation officielle](https://fr.vuejs.org/v2/guide/events.html#Event-Modifiers).

```vue
<!-- la propagation de l'événement clic sera stoppée -->
<a @click.stop="onThis">...</a>

<!-- la soumission du formulaire ne rechargera plus la page -->
<form @submit.prevent="onSubmit">...</form>

<!-- les modificateurs peuvent être cumulés -->
<a @click.stop.once="doSomethingOnce">...</a>

<!-- également disponible: .tab, .delete, .esc, .space... -->
<input @keypress.enter="submit" />
```

## TP: Fiche d'un film

1. Sur le formulaire d'authentification, ajoutez deux variables `email` et `password` dans l'option `data` du composant et utilisez la directive `v-model` sur les champs email et password pour les lier.
2. Ajoutez une autre variable `loggedIn` initialement à `false`, puis utilisez la directive `v-on` pour l'assigner à `true` à la soumission du formulaire.
3. Modifier le comportement par défaut de l'évènement `submit` du formulaire d'authentification afin d'éviter le rechargement de la page.
4. Sous le formulaire d'authentification, ajoutez le HTML suivant:
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
6. Ajoutez la variable suivante dans l'option `data` du composant:
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
9. **Bonus:** trouvez comment utiliser la propriété `metascore` pour afficher un certain nombre d'étoiles à côté de chaque titre de film.