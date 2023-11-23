const strHeroes = document.getElementById("str_heroes");
const agiHeroes = document.getElementById("agi_heroes");
const intHeroes = document.getElementById("int_heroes");
const uniHeroes = document.getElementById("uni_heroes");


async function getHeroes() {
    const response = await fetch("https://api.opendota.com/api/heroes");
    let heroesArray = await response.json();

    console.log(heroesArray);

    for (let hero of heroesArray) {
        switch (hero.primary_attr) {
            case "str":
                strHeroes.innerHTML += `<p>${hero.localized_name}</p>`;
                break;
            case "agi":
                agiHeroes.innerHTML += `<p>${hero.localized_name}</p>`;
                break;
            case "int":
                intHeroes.innerHTML += `<p>${hero.localized_name}</p>`;
                break;
            default:
                uniHeroes.innerHTML += `<p>${hero.localized_name}</p>`;
        }
    }
}

document.addEventListener("load", getHeroes());