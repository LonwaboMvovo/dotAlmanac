function filterHeroesBySubstring(heroes, substring) {
    return heroes.filter(name => name.localized_name.toLowerCase().includes(substring))
}

function updateHeroesContainer() {
    const heroesContainer = document.getElementById("heroes-container");

    let heroesToShow = [];

    for (let hero of filterHeroesBySubstring(heroesArray, "")) {
        heroesContainer.innerHTML += `<p><a href="/${hero.localized_name}" onclick="route()">${hero.localized_name}</a><p>`;
    }
}

async function getHeroes() {
    const response = await fetch("https://api.opendota.com/api/heroes");
    let heroesArray = await response.json();

    return heroesArray;
}

let heroFilter = {
    "attribute": null,
    "type": null,
    "attack": null,
    "complexity": null,
    "tags": null,
    "name": ""
};
