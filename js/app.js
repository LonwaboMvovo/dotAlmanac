function heroesByAttribute(hero) {
    return heroFilter.attribute.includes(hero.stats.primaryAttribute);
}

function heroesByType(hero) {
    return heroFilter.type.some((type) => hero.roles.map(role => role.roleId).includes(type));
}

function heroesByComplexity(hero) {
    return heroFilter.complexity.includes(hero.stats.complexity);
}

function heroesByAttack(hero) {
    return heroFilter.attack.includes(hero.stats.attackType);
}

function heroesByTags(hero) {
    return heroFilter.tags.every((tag) => hero.roles.map(role => role.roleId).includes(tag));
}

function heroesBySubstring(hero) {
    return hero.displayName.toLowerCase().includes(heroFilter.name);
}

async function updateHeroesContainer() {
    const heroesContainer = document.getElementById("heroes-container");
    heroesContainer.innerHTML = "";

    let heroesToShow = heroesArray
    .filter(heroesBySubstring)
    .filter(heroesByAttribute)
    .filter(heroesByComplexity)
    .filter(heroesByType)
    .filter(heroesByAttack)
    .filter(heroesByTags);

    for (let hero of heroesToShow) {
        heroesContainer.innerHTML += `<p><a href="/${hero.displayName.replace(/\s/g, "").toLowerCase()}" onclick="route()">${hero.displayName}</a><p>`;
    }
}

let heroFilter = {
    "attribute": ["str", "agi", "int", "all"],
    "type": ["CARRY", "SUPPORT"],
    "complexity": [1, 2, 3],
    "attack": ["Melee", "Ranged"],
    "tags": [],
    "name": ""
};
