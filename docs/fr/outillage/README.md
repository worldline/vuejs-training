# Outillage

## Outils à installer

### Node.js

Installez [Node.js](https://nodejs.org/) (dernière version stable recommandée). Si vous devez gérer plusieurs versions différentes de Node.js sur la même machine, vous pouvez utiliser [nvm](https://github.com/creationix/nvm).

### Visual Studio Code et Vetur/Volar

Vous aurez besoin d'un bon éditeur de code pour JavaScript lors de cette formation.

Nous vous conseillons [Visual Studio Code](https://code.visualstudio.com/), un éditeur gratuit assez léger qui est aujourd'hui très populaire dans la communauté JavaScript.

VS Code dispose de nombreuses extensions pour enrichir l'éditeur. Pour le développement avec Vue.js, nous vous recommandons ces extensions qui fournissent de la coloration syntaxique et de l'autocomplétion pour les fichiers de composants Vue:

<VueVersionSwitch slot-key="vscode-extension" />
::: slot vscode-extension-vue2
Pour Vue 2, utilisez cette extension: [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
:::

::: slot vscode-extension-vue3
Pour Vue 3, utilisez cette extension: [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
:::

### Vue Devtools

Téléchargez l'extension [vue-devtools](https://github.com/vuejs/vue-devtools) disponible sur Chrome, Firefox ou en application standalone. Cela vous aidera pour le débogage lors des TP.

## Utilisation de Vue.js sans étape de build (runtime only)

Il est tout à fait possible d'utiliser Vue.js sans tout cet outillage sur le poste de développeur. Vue est à la base une bibliothèque JavaScript qui peut être importée et utilisée directement sur les navigateurs des clients.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello Vue</title>
    <script src="https://unpkg.com/vue"></script>
  </head>
  <body>
    <div id="app">
      <h1>Hello {{name}} !</h1>
    </div>

    <script>
      const vm = new Vue({ el: "#app", data: { name: "Vue" } });
    </script>
  </body>
</html>
```

Toutefois, ce mode d'utilisation trouve rapidement ses limites, et l'outillage développeur qui accompagne les projets Vue s'avère très précieux avec le temps. Mais cela peut être utile si vous voulez intégrer des composants Vue dans un projet fait avec un autre framework, ou si vous voulez faire un prototype rapide sans devoir installer d'outillage.

## TP : Création de votre premier projet

Vous pouvez utiliser au choix **Vue 2** ou **Vue 3** pour cette formation.

Placez-vous dans votre répertoire de travail et créez un projet appelé `search-films` en lançant la commande :

<VueVersionSwitch slotKey="npm-init" />

::: slot npm-init-vue3
```bash
npm init vue@latest
```
:::

::: slot npm-init-vue2
```bash
npm init vue@2
```
:::

**search-films** étant le nom du répertoire dans lequel nous allons initier notre projet.

Choisissez la configuration suivante :

```bash
✔ Project name: search-films
✔ Add TypeScript? No
✔ Add JSX Support? No
✔ Add Vue Router for Single Page Application development? No
✔ Add Pinia for state management? No
✔ Add Vitest for Unit Testing? ... Yes
✔ Add Cypress for testing? Yes
✔ Add ESLint for code quality? ... Yes
✔ Add Prettier for code formatting? ... Yes

Scaffolding project in ./search-films...
Done.
```

Nous vous recommandons d'utiliser TypeScript pour vos projets client de taille moyenne à large, mais dans le contexte de cette formation, nous allons nous cantonner à JavaScript. Nous sélectionnons les options **Non** pour les outils que nous ajouterons manuellement au projet plus tard.

A la fin de l'installation, un dossier a été créé pour votre projet. Naviguez vers le répertoire de votre projet et installez les dépendances:

```bash
cd search-films
npm install
```

### Travailler en mode développeur

Pour travailler sur l'application et la tester en direct, lancez la commande suivante :

```bash
npm run dev
```

Votre application sera alors accessible sur [localhost:3000](http://localhost:3000/) (port par défaut si disponible).

Dans **Visual Studio Code**, ouvrez le dossier de votre projet puis naviguez dans les différents fichiers pour vous approprier l'arborescence du projet.

### Build pour la production

Vous pouvez à tout moment packager votre projet pour la production avec la commande :

```bash
npm run build
```

Cette commande compilera votre projet en utilisant **Vite** et **Rollup** en mode production. Ces outils sont préconfigurés pour produire en sortie des assets statiques optimisés pour la production: ils transformeront vos sources en un petit nombre de _bundles_, des fichiers JS et CSS optimisés et compressés, et les placeront dans le dossier `/dist` de votre projet. Il ne reste alors plus qu'à déployer ce dossier sur un serveur de fichiers tel que Apache ou Nginx.

::: tip

Après un build, vous pouvez rapidement tester votre application buildée avec la commande `npm run preview`. D'autres commandes et instructions de base sont listées dans le README.md généré à la racine du projet.

:::

### Configuration du projet

Vous pouvez configurer tout cet outillage de multiples façons, via des fichiers de configuration dédiés. Par exemple, pour changer le port utilisé par le serveur de développement, créez un fichier `vite.config.js` à la racine du projet puis placez-y le contenu suivant :

```js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080
  }
})
```

Votre projet sera maintenant accessible sur le port 8080 en mode développeur. Consultez la [documentation de configuration](https://vitejs.dev/config/) pour en savoir plus sur les options disponibles.
