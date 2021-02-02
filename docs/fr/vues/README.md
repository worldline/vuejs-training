# Vues

## Aperçu d'un projet Vue

Le projet Vue fraîchement créé a les dossiers et fichiers suivants :

- `src` : les sources de votre projet
- `public` : tout le contenu qui sera directement mis à la racine du serveur web, sans être passé par Webpack
- `package.json` : les informations de package NPM du projet (version, dépendances, scripts etc.)
- `vue.config.js` : un fichier de configuration pour Vue CLI pour ce projet

D'autres fichiers de configuration pour les outils de build peuvent également se trouver ici.

Dans le dossier `src`, vous trouvez :

- `assets` : des ressources statiques (images, fichiers) qui seront importées par Webpack au sein de vos composants Vue
- `components` : vos composants Vue (répartis par dossier par "module" de votre application)
- `App.vue` : votre composant Vue racine, qui contient toute l'application
- `main.js` : le point d'entrée du code JavaScript de toute l'application

Par la suite, vous pourrez être amenés à créer d'autres dossiers dans `src` selon vos besoins. On trouve par exemple couramment un dossier `services` qui contient des briques de logique métier avec des fonctions utilisées dans plusieurs composants. Ou encore un dossier `utils` pour venir stocker diverses fonctions utilitaires en JavaScript plutôt que de les répéter à plusieurs endroits.

## Fichiers monocomposants *.vue

- Une application dans Vue.js est divisée en plusieurs composants
- Un composant correspond à un fichier `.vue`
- Un fichier `.vue` se compose de trois éléments optionnels :
    - la balise `<template>` contient le code HTML du composant
    - la balise `<script>` (optionnelle) contient le code JavaScript du composant
    - la balise `<style>` (optionnelle) contient le style CSS du composant

```vue
<template>
  <div>
    <span>Hello {{who}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      who: 'World'
    }
  }
}
</script>

<style scoped>
span {
  color: blue;
}
</style>
```

La partie script du composant doit exporter par défaut un objet avec les propriétés du composant. On retrouve ici la propriété `name`, utile pour identifier le composant pendant le débogage ; et la propriété data qui fixe les données initiales du composant. Les autres propriétés seront abordées dans la section Composants.

::: tip
D'après vous, pourquoi la propriété `data` d'un composant doit être une fonction ?

[Réponse](https://fr.vuejs.org/v2/guide/components.html#data-doit-etre-une-fonction)
:::

## Travailler en composants

Les composants Vue décrits précédemment constituent les briques avec lesquelles vous allez concevoir vos interfaces web. Une application web est composée de petits composants réutilisables, imbriqués dans des composants de plus haut niveau pour former le layout, l'agencement de vos éléments sur la page. Cette structure peut être décrite comme un **arbre de composants**.

![Component tree](../../assets/component-tree.png)

Pour relier les composants entre eux, on déclare les composants enfants dans le template du composant parent, en utilisant leur nom comme balise. Un composant peut être réutilisé autant de fois que nécessaire, en l'incluant de la façon suivante :

```vue
<!-- MonComposant.vue -->
<template>
  <div>
    <mon-composant-enfant></mon-composant-enfant>
  </div>
</template>

<script>
import MonComposantEnfant from './MonComposantEnfant.vue'

export default {
  name: 'MonComposant',
  components: {
    MonComposantEnfant
  }
}
</script>
```

::: tip
L'option `components` dans la partie script du composant. Les composants enfants utilisés dans le template sont déclarés ainsi pour rendre explicite les liens de dépendance et aider à éliminer le code mort. Mais il est également possible de déclarer des composants globalement sur votre application Vue, afin de pouvoir les utiliser partout sans avoir à les déclarer manuellement.
:::

Dans votre projet Vue, ouvrez le fichier `App.vue` et observez comment le composant `HelloWorld` a été intégré au composant racine `App`.

## Interpolation de texte dans les templates

::: v-pre
Le moyen le plus simple d'insérer des données dynamiquement dans vos composants est par interpolation de texte, au moyen de la syntaxe `{{maVariable}}`. A l'intérieur des doubles accolades, vous pouvez indiquer n'importe quelle expression JavaScript valide :
:::

```vue
<template>
  <p>Commande ref. {{ referenceCommande }} - Total : {{ prix.toFixed(2)+'€' }}</p>
</template>

<script>
  export default {
    name: 'InfoCommande',
    data(){
      return {
        referenceCommande: 'ABCXYZ',
        prix: 17.3
      }
    }
  }
</script>
```

L'interpolation ne fonctionne que sur le contenu textuel des éléments. Vous ne pouvez pas l'utiliser pour changer la valeur d'attributs HTML ou pour insérer du code HTML par exemple. Pour cela, vous devrez recourir aux *directives*, que l'on verra dans la section suivante.

## TP : Premier composant

1. Ajouter la feuille de style CSS qui servira de base pour tout le TP, téléchargeable ici : [stylesheet.css](https://worldline.github.io/vuejs-training/stylesheet.css) ; la placer dans le dossier src et l'inclure dans le projet avec `import "./stylesheet.css"` dans la partie script de `App.vue`.

2. Créer un nouveau composant `LoginForm.vue` contenant un formulaire d'authentification :

```html
<div id="login-form">
<form>
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required>

  <p><button type="submit">Se connecter</button></p>
</form>
</div>
```

3. Supprimez le contenu existant du template du composant `App.vue`, et affichez le composant `LoginForm.vue` à la place avec `<login-form />`. Vous devrez également déclarer `LoginForm` dans l'option `components` du composant `App`.

4. Complétez le fichier `LoginForm.vue` pour déclarer le nom du composant, ainsi qu'une option `data` contenant une propriété `title`. Utiliser ensuite l'interpolation de texte dans le template pour passer le titre du formulaire *"Authentification"* en utilisant cette variable `title`.