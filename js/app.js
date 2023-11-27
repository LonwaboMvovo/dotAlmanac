function heroesBySubstring(hero) {
    return hero.localized_name.toLowerCase().includes(heroFilter.name);
}

function heroesByAttribute(hero) {
    return heroFilter.attribute.includes(hero.primary_attr);
}

function heroesByType(hero) {
    return heroFilter.type.some((type) => hero.roles.includes(type));
}

function heroesByAttack(hero) {
    return heroFilter.attack.includes(hero.attack_type);
}

function updateHeroesContainer() {
    const heroesContainer = document.getElementById("heroes-container");
    heroesContainer.innerHTML = "";

    let heroesToShow = heroesArray
        .filter(heroesBySubstring)
        .filter(heroesByAttribute)
        .filter(heroesByType)
        .filter(heroesByAttack);

    for (let hero of heroesToShow) {
        heroesContainer.innerHTML += `<p><a href="/${hero.localized_name.replace(/\s/g, "").toLowerCase()}" onclick="route()">${hero.localized_name}</a><p>`;
    }
}

async function getHeroes() {
    const response = await fetch("https://api.opendota.com/api/constants/heroes");
    let heroesArray = await response.json();
    return Object.values(heroesArray);
}

let heroFilter = {
    "attribute": ["str", "agi", "int", "all"],
    "type": ["Carry", "Support"],
    "attack": ["Melee", "Ranged"],
    "tags": null,
    "name": ""
};
