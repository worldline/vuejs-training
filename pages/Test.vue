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
        <v-card-title class="headline primary--text">
          Tester vos applications
        </v-card-title>
        <v-card-text>
          <v-card-title class="subheading primary--text">
            Les tests unitaires avec Vue
          </v-card-title>
          <p>Les tests unitaires sont une étape fondamentale du développement de logiciel. Ces tests permettent d’exécuter chaque unité de code isolée du reste du logiciel. Ils facilitent l’ajout de nouvelles fonctionnalités, la détection et la correction de bugs.</p>
          <p>Les tests unitaires favorisent :</p>
          <ul>
            <li>La documentation du code ;</li>
            <li>La robutesse de votre application ;</li>
            <li>L’architecture du code ;</li>
            <li>Le refactoring.</li>
          </ul>

          <v-card-title class="subheading primary--text">
            Vue Test Utils
          </v-card-title>
          <p>Vue Test Utils est la bibliothèque officielle de test pour Vue.js, elle permet simplement de tester vos composants</p>
          <p>Par exemple sur le composant suivant :</p>
          <code-copy
            :code="snippets.countComponent"
            language="html"
          />
          <p>Nous pouvons simplement créer un test qui vérifie les éléments de base du composant :</p>
          <code-copy
            :code="snippets.countComponentTest"
            language="js"
          />
          <p>Cette blibliothèque propose une <a href="https://vue-test-utils.vuejs.org/api/">API</a> pour les composants Vue, voici certaines des méthodes les plus utilisées : </p>
          <ul>
            <li><code>mount</code>, permet de créer un <code>Wrapper</code> qui contient le composant ;</li>
            <li><code>shallowMount()</code>, comme le <code>mount</code> sans des éventuels composants enfants ;</li>
            <li><code>createLocalVue()</code>, permet de créer une instance de Vue dans laquelle ajouter des composants, mixins et/ou plugins.</li>
          </ul>
          <p>La classe <a href="https://vue-test-utils.vuejs.org/api/wrapper">Wrapper</a> représente votre composant monté. Elle propose de nombreuses méthodes pour :</p>
          <ul>
            <li>récupérer le DOM, comme <code>.html()</code>, <code>.text()</code></li>
            <li>rechercher des éléments dans le DOM, comme <code>.find()</code>, <code>.findAll()</code></li>
            <li>modifier votre composant, comme <code>.setData()</code>, <code>.setMethods()</code>, <code>.setProps()</code></li>
            <li>progager des évènements avec <code>.trigger()</code></li>
          </ul>
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            <p>Les méthodes du Wrapper et de l'API décritent ci-dessus permettent de tester la plupart des cas simples. Pour plus d'informations se référer à la <a href="https://vue-test-utils.vuejs.org/">documentation officielle</a>.</p>
          </v-alert>
          <v-card-title class="subheading primary--text">
            Jest
          </v-card-title>
          <p>Il nous faut maintenant un <code>Test Runner</code> pour lancer nos tests. Nous vous proposons ici d'utiliser <a href="https://jestjs.io/">Jest</a>, un des plus utilisés pour tester des projets front.</p>
          <p>Jest propose "out of the box" :</p>
          <ul>
            <li>Le lancement des tests en parallèles ;</li>
            <li>La génération d'un rapport de couverture de test ;</li>
            <li>Un <a href="https://jestjs.io/docs/en/mock-functions.html">mocking facile</a> des dépendances ;</li>
            <li>Des assertions simples et des expections lisibles.</li>
          </ul>
          <p>Par défaut, Jest va lancer tous les tests présents dans un dossier <code>tests/unit</code> ou <code>__tests__</code>. Par exemple, sur l'exemple ci-dessous les fichiers de tests <code>Film.spec.js</code> et <code>LoginForm.spec.js</code> seront exécutés.</p>
          <code-copy
            :code="snippets.projectTreeStructure"
            language="js"
          />
          <p>Ci-dessous quelques exemples pour illuster les <a href="https://jestjs.io/docs/en/api#methods">méthodes globales</a> proposées par Jest :</p>
          <code-copy
            :code="snippets.jestGlobalExample"
            language="js"
          />
          <p>Ci-dessous quelques exemples pour illuster les capacité de <a href="https://jestjs.io/docs/en/mock-functions">mocking</a> de Jest :</p>
          <code-copy
            :code="snippets.jestMockExample"
            language="js"
          />
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            <p>Il est également possible d'utiliser <a href="https://vue-test-utils.vuejs.org/guides/#testing-single-file-components-with-mocha-webpack">Mocha + webpack</a> ou <a href="https://vue-test-utils.vuejs.org/guides/#testing-single-file-components-with-karma">Karma</a> comme test runners</p>
          </v-alert>
          <v-card-title class="subheading primary--text">
            Jest + Vue Test Util = 🚀
          </v-card-title>
          <p>La combinaison de Jest avec Vue Test Util permet de tester simplement des fonctionnements complexes comme le store, le router ou des appels externes.</p>
          <p>L'exemple ci-dessous nous indique comment simuler des appels au store :</p>
          <code-copy
            :code="snippets.jestVueStoreExample"
            language="js"
          />
          <h1 class="headline primary--text pa-4">
            TP
          </h1>
          <ol>
            <li>Tester le composant Film.vue</li>
            <ol>
              <li>Créer un fichier de tests unitaires pour tester votre composant <code>Film.vue</code>.</li>
              <li>Monter le composant, ajouter une assertion basique et lancer les tests.</li>
              <li>Simuler les valeurs d'un film et vérifier le rendu HTML</li>
            </ol>
            <li>Ajouter le calcul de la couverture de code. Que constatez-vous ?</li>
            <li>(Bonus) Tester le composant LoginForm.vue</li>
            <ol>
              <li>Simuler les appels au store et au router</li>
              <li>Simuler les appels externes HTTPS</li>
              <li>Tester le cas nominal et d'erreur du login</li>
            </ol>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/http"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Requêtes HTTP
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/reusability"
          >
            Réutilisabilité
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
  data: () => ({
    snippets: {
      countComponent: `<template>
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
<\/script>`,
      countComponentTest: `
import { mount } from '@vue/test-utils'
import Counter from './counter'

describe('Counter', () => {
  // Le "wrapper" représente des composants
  const wrapper = mount(Counter)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // Vérification simple des éléments
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
      `,
      projectTreeStructure: `
-- components
  |-- Film.vue
  |-- LoginForm.vue
  |-- __tests__
    |-- Film.spec.js
    |-- LoginForm.spec.js
      `,
      jestGlobalExample: `
// Exécuté une seule fois avant tous les tests - beforeAll(fn, timeout)
beforeAll(async () => {
  await createDatabase()
}, 500)

// Exécuté une seule fois après tous les tests - afterAll(fn, timeout)
afterAll(async () => {
  await deleteDatabase()
}, 500)

// Exécuté avant chaque tests - beforeEach(fn, timeout)
beforeEach(() => {
  doSomething()
}, 500)

// Exécuté après chaque tests - beforeEach - afterEach(fn, timeout)
afterEach(async () => {
  await deleteDatabase();
}, 500)

// Un groupe de test - describe(name, fn)
// Les mots clés .skip, only et .each sont utilsables
describe('FilmCard test group', () => { ... })

// Un test unitaire - 'test' peut-être utilisé à la place de 'it'
// Les mots clés .skip, only et .each sont utilsables
it('should do something...', () => { ... })

// Exemple avec le mot clé .each
test.each\`
  a | b | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
\`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
      `,
      jestMockExample: `
// Exemple de mocking d'un service interne
import DogService from '@/services/DogService.js'

const fetchMock = jest.fn(() => Promise.resolve('the ball has been fetched'))
DogService.fetch = loginMock;

console.log(await DogService.fetch()) // the ball has been fetched

// Exemple de mocking d'une librairie externe comme axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 3 }))
}));
      `,
      jestVueStoreExample: `
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '../../../src/components/Actions'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Actions.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('dispatches "actionInput" when input event value is "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'input'
    input.trigger('input')
    expect(actions.actionInput).toHaveBeenCalled()
  })

  it('does not dispatch "actionInput" when event value is not "input"', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    const input = wrapper.find('input')
    input.element.value = 'not input'
    input.trigger('input')
    expect(actions.actionInput).not.toHaveBeenCalled()
  })

  it('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(Actions, { store, localVue })
    wrapper.find('button').trigger('click')
    expect(actions.actionClick).toHaveBeenCalled()
  })
})
      `
    }
  }),
  components: {
    CodeCopy
  }
}
</script>

<style>
ul {
  margin-bottom: 1em;
}
</style>
