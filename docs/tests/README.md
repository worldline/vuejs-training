# Unit tests

## Pourquoi des tests unitaires ?

Les tests unitaires sont une étape essentielle du développement de logiciel. Ces tests permettent d’exécuter chaque unité de code isolée du reste du logiciel. Ils apportent de nombreux bénéfices :
- documenter la façon dont un composant doit se comporter
- détecter et corriger les bugs plus tôt et plus efficacement
- gagner du temps passé à tester manuellement
- favoriser le refactoring en toute quiétude

## Choix du test runner

Pour faire des tests unitaires, vous avez besoin d'une **bibliothèque d'assertions** qui fournit l'API nécessaire pour écrire vos tests, et un **test runner** qui s'occupe de lancer les tests et recueillir les résultats. [Vue CLI](https://cli.vuejs.org/) possède des options intégrées pour mettre en place dès le départ des tests unitaires sur votre projet Vue avec le choix entre plusieurs runners. Nous vous proposons ici d'utiliser [Jest](https://jestjs.io/), un test runner complet, populaire, avec peu de configuration nécessaire, et qui fournit une bibliothèque d'assertions basique mais suffisante pour la plupart des usages.

[Jest](https://jestjs.io/) propose "out of the box" :
- le lancement des tests en parallèles ;
- la génération d'un rapport de couverture de test ;
- un *mocking* facile des dépendances ;
- des assertions simples et des tests lisibles ;
- une interface en ligne de commande très complète.

::: tip
Comme alternative à Jest, l'équipe de Vue propose aussi [mocha-webpack](https://github.com/zinserjan/mocha-webpack), un wrapper entre Mocha et Webpack. Cette solution requiert toutefois un peu plus de configuration initiale.
:::

## Ecriture de tests avec Jest

Par défaut, Jest va lancer tous les tests présents dans un dossier `tests/unit` ou `__tests__`. Par exemple, les tests dans `Film.spec.js` et `LoginForm.spec.js` seront repérés et exécutés par Jest ici:

```
-- components
  |-- Film.vue
  |-- LoginForm.vue
  |-- __tests__
    |-- Film.spec.js
    |-- LoginForm.spec.js
```

Quelques exemples pour illuster les méthodes globales proposées par Jest :

```js
// Exécuter un code une seule fois avant tous les tests - beforeAll(fn, timeout)
beforeAll(async () => { await createDatabase() }, 500)

// Exécuter un code une seule fois après tous les tests - afterAll(fn, timeout)
afterAll(async () => { await deleteDatabase() }, 500)

// Exécuter un code avant chaque test - beforeEach(fn, timeout)
beforeEach(() => { initState() }, 500)

// Exécuté après chaque tests - beforeEach - afterEach(fn, timeout)
afterEach(async () => { await resetState() }, 500)

// Un test unitaire - 'test' peut-être utilisé à la place de 'it'
// Les mots clés .skip, only et .each sont utilsables
test('should do something...', () => { 
    expect(add(1, 2).toBe(3)
})

// Tester rapidement plusieurs cas avec le mot clé .each
test.each`
  a | b | expected
  1 | 1 | 2
  1 | 2 | 3
  2 | 1 | 3
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected)
})

// Grouper les tests par pan fonctionnel - describe(name, fn)
// Les mots clés .skip, only et .each sont utilsables
describe('Film Card', () => { 
    test(...)
    test(...)
    ...
 })
```

## Mocking

Le **mocking** consiste à isoler le sujet de test en remplaçant par des simulacres toutes les briques extérieures avec lesquelles il interagit. Ainsi, en cas d'échec du test, on s'assure que le problème vient bien de la fonction testée et non d'un composant externe (réseau, bases de données, lib tierce etc.)

Ci-dessous quelques exemples pour illuster les capacité de mocking de Jest :

```js
// Exemple de mocking d'une fonction locale
import ApiService from '@/services/api.js'
import FilmService from '@/services/film.js'

test("la recherche de films ne retourne aucun résultat", done => {
    // mock de l'api pour retourner une liste vide
    ApiService.api = jest.fn(() => Promise.resolve([]))

    FilmService.search("zzzz").then(results => {
        expect(results.length).toBe(0)
        done();
    })
}
```

```js
// Exemple de mocking d'une librairie externe comme axios
jest.mock('axios');

test('login utilisateur', () => {
  axios.get.mockResolvedValue({ token: "123456" });

  return UserService.login({ name: "Bob", password: "p4ssw0rd" })
    .then(response => expect(response.token).toEqual("123456"));
});
```

## Vue Test Utils

Pour faciliter l'écriture de tests pour des composants Vue, l'équipe fournit également [Vue Test Utils](https://vue-test-utils.vuejs.org/), la bibliothèque officielle d'utilitaires de tests unitaires pour Vue.js. Elle est accompagnée d'un [guide détaillé](https://vue-test-utils.vuejs.org/) pour vous aider à mettre en place vos tests dans des configurations personnalisées.

Par exemple sur le composant suivant :
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

Nous pouvons créer un test qui vérifie le contenu du composant :

```js
import { mount } from '@vue/test-utils'
import Counter from './counter'

describe('Counter', () => {
  // Le "wrapper" contient le composant monté ainsi que des méthodes pour le tester
  const wrapper = mount(Counter)

  test('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // Vérification simple de présence d'éléments
  test('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
```
      
Cette blibliothèque propose une API pour tester les composants Vue, voici certaines des méthodes les plus utilisées :

- `mount` : permet de monter le composant sur un DOM pour pouvoir le tester ;
- `shallowMount` : comme mount mais sans monter les éventuels composants enfants ;
- `createLocalVue` : crée une instance de Vue dans laquelle ajouter des composants, mixins et/ou plugins.

La classe `Wrapper` représentant votre composant monté propose de nombreuses méthodes comme :

- `.html()`, `.text()`: récupère le contenu HTML ou texte
- `.find()`, `.findAll()` : rechercher des éléments HTML dans le composant
- `.setData()`, `.setMethods()`, `.setProps()`: modifier les options de votre composant
- `.trigger()`: progager des évènements 

::: tip
Les méthodes décrites ci-dessus permettent de tester la plupart des cas simples. Pour plus d'informations se référer à la [documentation officielle](https://vue-test-utils.vuejs.org/).
:::

## Jest + Vue Test Utils = 🚀

La combinaison de Jest avec Vue Test Utils permet de tester des fonctionnements complexes comme le store, le routeur ou des appels externes.

L'exemple ci-dessous montre comment simuler des appels au store ainsi que des événements utilisateur comme des clics ou de la saisie :

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

## TP: Tester le composant Film

1. Créer un fichier de spec de tests unitaires pour tester votre composant `Film.vue`.
2. Dans votre test, monter le composant, ajouter une assertion basique et lancer les tests.
3. Simuler les valeurs d'un film et vérifier le rendu HTML
4. Ajouter le calcul de la couverture de code. Que constatez-vous ?
5. **Bonus**: Tester le composant `LoginForm.vue`, en mockant les appels externes HTTPS ainsi que les appels au store et au routeur. Tester le cas nominal et d'erreur du login.