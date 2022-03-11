# Tests automatisés

## Pourquoi des tests automatisés ?

Les tests automatisés sont une étape essentielle du développement de logiciel, et apportent de nombreux bénéfices :

- documenter la façon dont un composant doit se comporter
- détecter et corriger les bugs plus tôt et plus efficacement
- gagner du temps passé à tester manuellement
- favoriser le refactoring en toute quiétude

## Les types de tests automatisés

- **Tests unitaires**: ils vérifient que les entrées des fonctions, classes ou composables testés produisent bien les résultats attendus en sortie
- **Tests composants**: ils vérifient que le composant est bien monté et rendu, que l'utilisateur peut interargir avec et qu'il se comporte comme attendu. Ces tests importent plus de code que pour les tests unitaires et sont plus complexes, ce qui implique qu'ils sont plus longs à exécuter.
- **Tests end-to-end**: aussi appelés tests bout à bout, ces tests couvrent toute votre stack applicative, permettant de tester des scénarios complexes, du front jusqu'à la base de données, sans aucun mocking.

## Choix du test runner

Pour faire des tests automatisés, vous avez besoin d'un **test runner** qui s'occupe de lancer les tests et recueillir les résultats. L'équipe de Vue recommande [`Vitest`](https://vitest.dev/) pour les tests unitaires et les tests de composants simples (sans interaction), et [`Cypress`](https://on.cypress.io/component) pour les tests de composants plus complexes et les tests end-to-end. 

La différence principale entre ces deux solutions est le temps d'exécution et le contexte d'exécution. Cypress invoque un vrai navigateur pour dérouler ses tests, ce qui permet de repérer des problèmes que Vitest ne peut repérer: problèmes de styles CSS, d'événements du DOM, de requêtes réseau en échec...

Vitest et Cypress sont normalement déjà configurés sur votre projet de TP si vous avez bien suivi les instructions à l'initialisation du projet.

Pour plus d'informations et des choix alternatifs d'outillage, vous référer à la [documentation officielle](https://vuejs.org/guide/scaling-up/testing.html).

## Vue Test Utils

Pour faciliter l'écriture de tests pour des composants Vue, l'équipe fournit également [Vue Test Utils](https://vue-test-utils.vuejs.org/), la bibliothèque officielle d'utilitaires de tests pour Vue.js. Elle est accompagnée d'un [guide détaillé](https://vue-test-utils.vuejs.org/) pour vous aider à mettre en place vos tests dans des configurations personnalisées.

Cette bibliothèque propose une API pour tester les composants Vue, voici certaines des méthodes les plus utilisées :

- `mount` : permet de monter le composant sur un DOM pour pouvoir le tester ;
- `shallowMount` : comme mount mais sans monter les éventuels composants enfants ;
- `createLocalVue` : crée une instance de Vue dans laquelle ajouter des composants, mixins et/ou plugins.

La classe `Wrapper` représentant votre composant monté propose de nombreuses méthodes comme :

- `.html()`, `.text()` : récupère le contenu HTML ou texte
- `.find()`, `.findAll()` : rechercher des éléments HTML dans le composant
- `.setData()`, `.setMethods()`, `.setProps()` : modifier les options de votre composant
- `.trigger()` : propager des évènements

::: tip
Les méthodes décrites ci-dessus permettent de tester la plupart des cas simples. Pour plus d'informations se référer à la [documentation officielle](https://vue-test-utils.vuejs.org/).
:::

## Ecriture de tests avec Vitest et Vue Test Utils

Par défaut, Vitest va lancer tous les tests présents dans les dossiers  `__tests__`. Par exemple, les tests des composants `Film` et `LoginForm` seront repérés et exécutés par Vitest ici :

```
-- components
  |-- Film.vue
  |-- LoginForm.vue
  |-- __tests__
    |-- Film.spec.js
    |-- LoginForm.spec.js
```

Voici un exemple basique de test du composant `LoginForm`:

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

Le **mocking** consiste à isoler le sujet de test en remplaçant par des simulacres toutes les briques extérieures avec lesquelles il interagit. Ainsi, en cas d'échec du test, on s'assure que le problème vient bien de la fonction testée et non d'un composant externe (réseau, bases de données, lib tierce etc.)

Ci-dessous un exemple illustrant les capacités de mocking de Vitest :

```js
import { test, vi } from 'vitest'

// Exemple de mocking d'une fonction locale
import ApiService from '@/services/api.js'
import FilmService from '@/services/film.js'

test("la recherche de films ne retourne aucun résultat", done => {
    // mock de l'API pour retourner une liste vide
    ApiService.api = vi.fn(() => Promise.resolve([]))

    FilmService.search("something").then(results => {
        expect(results.length).toBe(0)
        done();
    })
})
```

## TP : Tester le composant Film

1. Créer un fichier de spec `Film.spec.js` pour tester votre composant `Film.vue`.
2. Dans votre test, monter le composant, ajouter une assertion basique et lancer les tests.
3. Simuler les valeurs d'un film et vérifier le rendu HTML.
4. **Bonus** : Tester le composant `LoginForm.vue`, en mockant les appels externes HTTPS ainsi que les appels au store et au routeur. Tester le cas nominal et d'erreur du login.