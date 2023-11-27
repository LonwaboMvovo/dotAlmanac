function heroesBySubstring(hero) {
    return hero.localized_name.toLowerCase().includes(heroFilter.name);
}

function heroesByAttribute(hero) {
    return heroFilter.attribute.includes(hero.primary_attr);
}

function heroesByType(hero) {
    return heroFilter.type.some((type) => hero.roles.includes(type));
}

function updateHeroesContainer() {
    const heroesContainer = document.getElementById("heroes-container");
    heroesContainer.innerHTML = "";

    let heroesToShow = heroesArray
        .filter(heroesBySubstring)
        .filter(heroesByAttribute)
        .filter(heroesByType);

    for (let hero of heroesToShow) {
        heroesContainer.innerHTML += `<p><a href="/${hero.localized_name.replace(/\s/g, "").toLowerCase()}" onclick="route()">${hero.localized_name}</a><p>`;
    }
}

async function getHeroes() {
    const response = await fetch("https://api.opendota.com/api/heroes");
    let heroesArray = await response.json();
    return heroesArray;
}

let heroFilter = {
    "attribute": ["str", "agi", "int", "all"],
    "type": ["Carry", "Support"],
    "attack": null,
    "complexity": null,
    "tags": null,
    "name": ""
};
