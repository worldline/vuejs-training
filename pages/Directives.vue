<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Directives
        </v-card-title>
        <v-card-text>
          <p>Les directives sont les éléments de syntaxe propres à Vue utilisables dans les templates des composants Vue.</p>
          <v-card-title class="subheading primary--text">
            v-bind (:)
          </v-card-title>
          <p>Permet de lier (<em>bind</em>) la valeur d'un attribut d'un élément HTML à une variable du composant.</p>
          <code-copy
            :code="example_vbind"
            language="html"
          />

          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/LBgqbq?editors=1010"
              target="_blank"
            >
              Exercice: essayez de lier les attributs <code>src</code> et <code>width</code> de l'image
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            Lier des classes et des styles
          </v-card-title>
          <p>Plusieurs syntaxes sont proposées pour assigner des classes ou des styles CSS</p>
          <code-copy
            :code="example_bind_css"
            language="html"
          />
          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/qyJgLe?editors=1010"
              target="_blank"
            >
              Exercice: assignez une classe et une couleur à chaque fantôme
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            v-model: Formulaires et inputs
          </v-card-title>
          <p>Permet de lier la valeur d'un champ de formulaire à une donnée du composant. C'est une liaison à double-sens, c'est-à-dire que la variable se met à jour quand le contenu du champ change (typiquement par l'utilisateur) et réciproquement.</p>
          <code-copy
            :code="example_vmodel"
            language="html"
          />
          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/rrqEMg?editors=1010"
              target="_blank"
            >
              Exercice: utilisez v-model sur les input, select, radio et checkbox
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            v-if: Conditions
          </v-card-title>
          <p>Permet d'insérer ou non un élément selon une condition. Si vous souhaitez que l'élément ne soit pas retiré du DOM mais juste caché visuellement en CSS, utilisez <code>v-show</code> à la place.</p>
          <p>Les directives <code>v-else-if</code> et <code>v-else</code> fonctionnent de la même façon que leur équivalent JavaScript et dépendent de la condition <code>v-if</code> de l'élément qui les précède directement.</p>
          <code-copy
            :code="example_vif"
            language="html"
          />
          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/bjmXXV?editors=1010"
              target="_blank"
            >
              Exercice: utilisez v-if et v-else pour alterner les visages selon la condition
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            v-for: Boucles
          </v-card-title>
          <p>Permet de générer des listes d'éléments en répétant un template selon une valeur itérable, typiquement un <code>Array</code>, la liste des propriétés d'un objet, ou encore un nombre fixe d'itérations. La directive permet de déclarer une variable itérateur qui prendra la valeur de chaque élément itéré et pourra être utilisé dans le template sous-jacent.</p>
          <code-copy
            :code="example_vfor"
            language="html"
          />
          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/RBqbBW?editors=1010"
              target="_blank"
            >
              Exercice: utilisez deux boucles v-for pour afficher tout le contenu du panier
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            v-on (@)
          </v-card-title>
          <p>Permet de définir une action à effectuer lorsqu'un évènement survient. Il peut s'agir d'un événement du DOM (click, mouseover, focus...) ou d'un événement personnalisé émis par un composant enfant.</p>
          <code-copy
            :code="example_von"
            language="html"
          />
          <p>
            <a
              href="https://codepen.io/sylvainpv/pen/NBEKQw?editors=1010"
              target="_blank"
            >
              Exercice: utilisez les événements pour ajouter un singe au clic sur bouton, et leur faire ouvrir les yeux au passage de la souris
            </a>
          </p>

          <v-card-title class="subheading primary--text">
            Modificateurs
          </v-card-title>
          <p>
            Les modificateurs sont des suffixes permettant de modifier légèrement le comportement de certaines directives ; par exemple, stopper la propagation d'un événement capturé avec <code>v-on</code>. Pour en savoir plus, se référer à la <a
              href="https://fr.vuejs.org/v2/guide/events.html#Event-Modifiers"
              target="_blank"
            >documentation officielle</a>.
          </p>
          <code-copy
            :code="example_modifiers"
            language="html"
          />

          <v-card-title class="headline primary--text">
            TP
          </v-card-title>
          <ol>
            <li>Sur le formulaire d'authentification, ajoutez deux variables à l'option <code>data</code> du composant et utilisez la directive <code>v-model</code> sur les champs email et password pour les lier.</li>
            <li>Ajoutez une autre variable <code>loggedIn</code> initialement à <code>false</code>, puis utilisez la directive <code>v-on</code> pour l'assigner à <code>true</code> au <code>submit</code> du formulaire.</li>
            <li>Modifier le comportement par défaut de l'évènement <code>submit</code> du formulaire d'authentification, de sorte à éviter le rechargement de la page.</li>
            <li>
              Sous le formulaire d'authentification, ajoutez le HTML suivant
              <code-copy
                copyable="true"
                language="html"
                :code="tp_film_card"
              />
            </li>
            <li>Utilisez les directives <code>v-if</code> et <code>v-else</code> pour afficher le formulaire d'authentification et cacher la liste des films quand <code>loggedIn === false</code>, et réciproquement.</li>
            <li>
              Ajoutez la variable suivante dans l'option <code>data</code> du composant:
              <code-copy
                copyable="true"
                language="javascript"
                :code="tp_films_data"
              />
            </li>
            <li>A l'aide de la directive <code>v-for</code>, répétez l'élément <code>.film.card</code> pour afficher autant de films que contient la donnée <code>films</code></li>
            <li>Utilisez les directives et l'interpolation pour remplacer les données des cartes par celle de chaque film.</li>
            <li><i>Bonus:</i> trouvez comment utiliser la donnée <code>metascore</code> pour afficher un certain nombre d'étoiles à côté de chaque titre de film.</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/vues"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Vues
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/components"
          >
            Composants
            <v-icon right>
              navigate_next
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CodeCopy from '~/components/CodeCopy'

export default {
  data () {
    return {
      example_vbind: `<!-- full syntax -->
<a v-bind:href="url"></a>
<!-- shorthand -->
<a :href="url"></a>`,
      example_bind_css: `<p :class="classAsString"></p>
<p :class="classAsObject"></p>
<p :class="['text-info', myOtherClass]"></p>
<p :class="{ 'text-error': hasError }"></p>

<p :style="styleAsString"></p>
<p :style="styleAsObject"></p>
<p :style="[baseStyles, overridingStyles]"></p>
<p :style="{ fontSize: size }"></p>`,
      example_vmodel: `<label>
  What is your name ?
  <input v-model="name">
</label>

<h1>Hi {{ name }} !</h1>`,
      example_vif: `<div v-if="type === 'A'">
  A
</div>
<div v-else-if="isTypeB">
  B
</div>
<div v-else>
  Not A nor B
</div>

<template v-if="loaded">
  <h1>One condition</h1>
  <p>for a group of elements</p>
</template>`,
      example_vfor: `<span v-for="n in 10">{{ n }}</span>

<li v-for="item in items">{{ item }}</li>

<li v-for="(item, i) in items" :key="i">

<template v-for="field in fields">
  <label>{{field.label}}</label>
  <input v-model="field.value">
</template>`,
      example_von: `<button v-on:click="counter += 1">
  Click me !
</button>
<p>This button has been clicked {{ counter }} times.</p>

<!-- shorthand syntax -->
<button @focus="onFocus($event)">
  Focus me !
</button>`,
      example_modifiers: `<!-- the click event's propagation will be stopped -->
<a @click.stop="onThis">...</a>
<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit">...</form>
<!-- modifiers can be chained -->
<a @click.stop.once="doSomethingOnce">...</a>
<!-- also available .tab, .delete, .esc, .space, ...-->
<input @keypress.enter="submit" />`,
      tp_film_card: `<ul class="films">
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
</ul>`,
      tp_films_data: `
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
]`
    }
  },
  components: {
    CodeCopy
  }
}
</script>
