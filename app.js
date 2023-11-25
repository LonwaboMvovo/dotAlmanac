const heroes = document.getElementById("heroes");


async function getHeroes() {
    // Don't wanna make API call all the time, so commenting for now and using value from previous call
    // const response = await fetch("https://api.opendota.com/api/heroes");
    // let heroesArray = await response.json();

    for (let hero of heroesArray) {
        heroes.innerHTML += `<p>${hero.localized_name}</p>`;
    }
}

document.addEventListener("load", getHeroes());
