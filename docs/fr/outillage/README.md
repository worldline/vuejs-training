# Outillage

## Outils à installer

::: tip

Si cela respecte votre politique de sécurité locale, il est recommandé de travailler sous une VM Linux, par exemple [Dev-Box MTS](https://dev-box.gitlab-pages.kazan.atosworldline.com/dev-box/), pour avoir une meilleure expérience de développement. Toutefois ce n'est pas obligatoire pour cette formation.
:::

### Node.js

Installez [Node.js](https://nodejs.org/) (version 8.x minimum). Si vous devez gérer plusieurs versions différentes de Node.js sur la même machine, vous pouvez utiliser [nvm](https://github.com/creationix/nvm).

### Visual Studio Code et Vetur

Vous aurez besoin d'un bon éditeur de code pour JavaScript lors de cette formation.

Nous vous conseillons [Visual Studio Code](https://code.visualstudio.com/), un éditeur gratuit assez léger qui est aujourd'hui très populaire dans la communauté JavaScript.

VS Code dispose de nombreuses extensions pour enrichir l'éditeur. Installez l'extension [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) qui aidera l'éditeur à mieux gérer la syntaxe des fichiers composants `*.vue`.

### Vue Devtools

Téléchargez l'extension [vue-devtools](https://github.com/vuejs/vue-devtools) disponible sur Chrome, Firefox ou en application standalone. Cela vous aidera pour le débogage lors des TP.

### Vue CLI

Maintenant, installons les outils nécessaires au développement de projets Vue.js sur votre machine :

Nous aurons besoin d'installer l'utilitaire en ligne appelé [Vue CLI](https://cli.vuejs.org/). Cet utilitaire permet de créer et configurer des projets Vue beaucoup plus facilement.

Depuis votre Terminal, lancez la commande suivante pour installer `@vue/cli` en dépendance globale

```bash
npm install -g @vue/cli
```

Vous avez désormais accès à la commande `vue` depuis un terminal. Essayez-la pour vérifier la bonne installation et pour avoir plus d'informations sur les commandes disponibles :

```
$ vue
Usage: vue <command> [options]

Options:
  -V, --version                              output the version number
  -h, --help                                 output usage information

Commands:
  create [options] <app-name>                create a new project powered by vue-cli-service
  add [options] <plugin> [pluginOptions]     install a plugin and invoke its generator in an already created project
  invoke [options] <plugin> [pluginOptions]  invoke the generator of a plugin in an already created project
  inspect [options] [paths...]               inspect the webpack config in a project with vue-cli-service
  serve [options] [entry]                    serve a .js or .vue file in development mode with zero config
  build [options] [entry]                    build a .js or .vue file in production mode with zero config
  ui [options]                               start and open the vue-cli ui
  init [options] <template> <app-name>       generate a project from a remote template (legacy API, requires @vue/cli-init)
  config [options] [value]                   inspect and modify the config
  upgrade [semverLevel]                      upgrade vue cli service / plugins (default semverLevel: minor)
  info                                       print debugging information about your environment

  Run vue <command> --help for detailed usage of given command.
```

La commande `vue ui` est très utile pour les débutants: elle fournit une **interface graphique** sur navigateur dédiée à la gestion des projets Vue et aux tâches courantes d'un projet Vue. L'UI peut remplacer la ligne de commande pour de nombreuses tâches, comme par exemple :

- créer ou importer un projet Vue
- ajouter des plug-ins pour plus de fonctionnalités
- configurer l'outillage du projet
- lancer son application
- lancer les tests unitaires
- etc.

<figure>

![Démonstration de Vue UI](../../assets/vue-cli-3-serve.gif)

<figcaption>Vue UI : lancement du projet en mode développeur, avec les statistiques en temps réel du bundler (Webpack)</figcaption>
</figure>

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

Placez-vous dans votre répertoire de travail et créez un projet appelé `search-films` en lançant la commande :

```bash
vue create search-films
```

**search-films** étant le nom du répertoire dans lequel nous allons initier notre projet.

Choisissez la configuration suivante :

```bash
@vue/cli 4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Linter, Unit
? Choose a version of Vue.js that you want to start the project with (Use arrow keys): 2.x
? Pick a linter / formatter config: ESLint with error prevention only
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.: In dedicated config files
? Pick the package manager to use when installing dependencies: Use NPM
```

- **Babel** est un _transpilateur_, un outil qui va compiler et convertir votre code afin qu'il soit supporté au mieux par un maximum de navigateurs.
- **ESLint** est un _linter_, un outil d'analyse qualité qui va parcourir votre code et vous signaler des erreurs potentielles.
- **Jest** est un _framework_ de test axé sur la simplicité d'utilisation.

A la fin de l'installation, un dossier a été créé pour votre projet. Naviguez vers le répertoire de votre projet :

```bash
cd search-films
```

### Travailler en mode développeur

Pour travailler sur l'application et la tester en direct, lancez la commande suivante :

```bash
npm run serve
```

Votre application sera alors accessible sur [localhost:8080](http://localhost:8080/) (port par défaut si disponible).

Dans **Visual Studio Code**, ouvrez le dossier de votre projet puis naviguez dans les différents fichiers pour vous approprier l'arborescence du projet.

### Build pour la production

Vous pouvez à tout moment packager votre projet pour la production avec la commande :

```bash
npm run build
```

Cette commande compilera votre projet en utilisant **Webpack** en mode production. Webpack est un _bundler_, un outil qui va transformer vos sources en un petit nombre de _bundles_, des fichiers JS et CSS optimisés et compressés, et les mettre dans le dossier `/dist` de votre projet. Il ne reste alors plus qu'à déployer ce dossier sur un serveur de fichiers tel que Apache ou Nginx.

::: tip

Les commandes de base de Vue CLI sont listées dans le README.md généré à la racine du projet

:::

### Configuration du projet

Vous pouvez configurer votre projet Vue de multiples façons, par exemple en changeant le port utilisé par le serveur de développement. À la racine du projet, créez un fichier `vue.config.js`, puis placez-y le contenu suivant :

```js
module.exports = {
  devServer: {
    port: 3000
  }
};
```

Votre projet sera maintenant accessible sur le port 3000 en mode développeur. Consultez la [documentation de configuration](https://cli.vuejs.org/config/) pour en savoir plus sur les options disponibles.
