module.exports = {
	base: "/vuejs-training/",
	locales: {
		"/": {
			lang: "en-US", // this will be set as the lang attribute on <html>
			title: "Introduction to Vue.js",
			description: "Discover Vue.js framework through this 2-days training",
		},

		"/fr/": {
			lang: "fr-FR",
			title: "Introduction à Vue.js",
			description: "Découvrez le framework Vue.js dans cette formation de 2 jours",
		},
	},

	themeConfig: {
		locales: {
			"/": {
				selectText: "Language",
				label: "English",
				sidebar: [
					"/",
					"/presentation/",
					"/tooling/",
					"/views/",
					"/directives/",
					"/components/",
					"/reactivity/",
					"/state/",
					"/routing/",
					"/http/",
					"/tests/",
					"/reusability/",
					"/ecosystem/",
				],
			},

			"/fr/": {
				selectText: "Langue",
				label: "Français",
				sidebar: [
					"/fr/",
					"/fr/presentation/",
					"/fr/outillage/",
					"/fr/vues/",
					"/fr/directives/",
					"/fr/composants/",
					"/fr/reactivite/",
					"/fr/etat/",
					"/fr/routage/",
					"/fr/http/",
					"/fr/tests/",
					"/fr/reutilisabilite/",
					"/fr/ecosysteme/",
				],
			},
		},
	},

	plugins: [
		require("./plugins/copy-code/"),
		"vuepress-plugin-global-toc",
		["live"],
	],
}