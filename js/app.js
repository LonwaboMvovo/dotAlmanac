function filterHeroesBySubstring(heroes, substring) {
    return heroes.filter(name => name.localized_name.toLowerCase().includes(substring))
}

function updateHeroesContainer() {
    const heroesContainer = document.getElementById("heroesContainer");

    for (let hero of heroesArray) {
        heroesContainer.innerHTML += `<p>${hero.localized_name}</p>`;
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
    "complexity": null,
    "name": ""
};

document.addEventListener("load", updateHeroesContainer());
