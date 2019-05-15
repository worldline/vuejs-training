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
          Réactivité
        </v-card-title>
        <v-card-text>
          <p>La réactivité est le mécanisme qui permet au framework de détecter lorsque des données utilisées sur la page sont modifiées (mutées), et de mettre à jour la page de façon optimale. C'est donc une mécanique cruciale pour tout framework web, et il convient d'en analyser le fonctionnement pour comprendre ses forces et ses limites.</p>

          <p>Vue fournit une réactivité automatique, c'est-à-dire qu'il n'est pas nécessaire au développeur de déclencher manuellement la mise à jour de la vue après avoir muté des données. Cette réactivité est basée sur 2 fonctionnalités de JavaScript: les getters/setters (ECMAScript 5), et les Proxies (ECMAScript 6).</p>

          <h2 class="subheading primary--text pa-2">
            Getters / setters (ECMAScript 5)
          </h2>
          <code-copy
            :code="example_getters_setters"
            language="javascript"
          />

          <p>En JavaScript, les propriétés d'un objet peuvent être déclarées avec un getter et un setter, qui sont des fonctions exécutées à l'accès en lecture et écriture à cette propriété. Vue.js les utilise en redefinissant des getters/setters pour toutes les data et props des composants, de façon à identifier les consommateurs de ces données ainsi que le moment où celles-ci sont mises à jour.</p>
          <p>La principale limitation des getters/setters est qu'il faut connaître au préalable le nom des variables pour leur assigner un getter/setter. C'est la raison pour laquelle <strong>il est impératif de déclarer en data ou en props toutes les variables utilisées par un composant si on veut qu'elles soient réactives</strong>.</p>
          <p>Dans les cas particuliers où il n'est pas possible de déclarer une variable au préalable, comme par exemple un <code>Array</code> extensible de longueur indéfinie ou une <code>Map</code>, Vue propose la méthodes <code>Vue.set</code> ou <code>vm.$set</code> pour assigner une valeur à une propriété en forçant la réactivité.</p>

          <div class="text-xs-center">
            <img
              src="~/assets/img/getters-setters.jpg"
              height="300"
            >
            <p>Principe de réactivité basé sur les getters/setters</p>
          </div>

          <h2 class="subheading primary--text pa-2">
            Proxies (ECMAScript 6)
          </h2>
          <code-copy
            :code="example_proxy"
            language="javascript"
          />
          <p>Les Proxies sont une nouveauté de JavaScript avec la spécification de 2015. Ils permettent de s'abstraire de toutes les limitations des getters/setters, en donnant un contrôle complet sur toutes les opérations permettant de manipuler un objet. Puisqu'ils ne sont pas supportés par les anciens navigateurs comme Internet Explorer, ils ne seront introduits que dans Vue 3.0, dont la sortie est prévue en 2019.</p>

          <h2 class="subheading primary--text pa-2">
            Détail du système de réactivité de Vue
          </h2>
          <div class="text-xs-center">
            <img
              src="~/assets/img/vue-reactivity.jpg"
              height="500"
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/components"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Composants
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/state"
          >
            Gestion d'état
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
  components: {
    CodeCopy
  },
  data () {
    return {
      example_getters_setters: `let _name = "joe";
const user = {
  get name() {
    console.log("accès en lecture à la propriété")
    return _name
  },
  set name(value) {
    console.log("accès en écriture à la propriété")
    _name = value
  }
}`,
      example_proxy: `const _user = { name: "joe" }
const user = new Proxy(_user, {
  get(obj, key) {
    console.log(\`accès en lecture à la propriété $\{key}\`)
    return Reflect.get(obj, key)
  },
  set (obj, key, value) {
    console.log(\`accès en écriture à la propriété $\{key} avec la valeur $\{value}\`)
    return Reflect.set(obj, key, value)
  }
})`
    }
  }
}
</script>
