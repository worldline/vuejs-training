import{ describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils"
import Film from "@/components/Film.vue"

describe("Film Component", () => {
	it("should correctly display one film", () => {
		const title = "Titanic"
		const released = "19 Dec 1997"
		const director = "James Cameron"
		const actors =
			"Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates"
		const poster =
			"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
		const plot =
			"84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning."
		const metascore = "75"

		const wrapper = shallowMount(Film, {
			propsData: {
				film: {
					title,
					released,
					director,
					actors,
					poster,
					plot,
					metascore,
				},
			},
		})
		expect(wrapper.get("img").attributes("src")).toEqual(poster)
		expect(wrapper.get(".title").text()).toContain(title)
		expect(wrapper.get(".rating").text()).toEqual("★★★★")

		const table = wrapper.findAll("dd")
		expect(table.at(0).text()).toEqual(released)
		expect(table.at(1).text()).toEqual(director)
		expect(table.at(2).text()).toEqual(actors)

		expect(wrapper.find(".plot").text()).toEqual(plot)
	})
})
