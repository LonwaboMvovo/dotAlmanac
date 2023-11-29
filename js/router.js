const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);

    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());

    document.getElementById("main-page").innerHTML = html;

    if (path === "/") {
        updateHeroesContainer();

        const filterAtribute = document.querySelectorAll(".filter-atr");
        const filterType = document.querySelectorAll(".filter-type");
        const filterComplexity = document.querySelectorAll(".filter-complexity");
        const filterAttack = document.querySelectorAll(".filter-attack");
        const filterTags = document.querySelectorAll(".filter-tags");
        const filterName = document.getElementById("filter-name");

        filterAtribute.forEach((button) => {
            button.addEventListener("click", () => {
                if (heroFilter.attribute.length === 1 && heroFilter.attribute[0] === button.id) {
                    heroFilter.attribute = ["str", "agi", "int", "all"];
                } else {
                    heroFilter.attribute = [button.id];
                }

                updateHeroesContainer();
            });
        });

        filterType.forEach((button) => {
            button.addEventListener("click", () => {
                if (heroFilter.type.length === 1 && heroFilter.type[0] === button.id) {
                    heroFilter.type = ["CARRY", "SUPPORT"];
                } else {
                    heroFilter.type = [button.id];
                }

                updateHeroesContainer();
            });
        });

        filterComplexity.forEach((button) => {
            button.addEventListener("click", () => {
                if (heroFilter.complexity.length === 1 && heroFilter.complexity[0] === parseInt(button.id)) {
                    heroFilter.complexity = [1, 2, 3];
                } else {
                    heroFilter.complexity = [parseInt(button.id)];
                }

                updateHeroesContainer();
            })
        })

        filterAttack.forEach((button) => {
            button.addEventListener("click", () => {
                if (heroFilter.attack.length === 1 && heroFilter.attack[0] === button.id) {
                    heroFilter.attack = ["Melee", "Ranged"];
                } else {
                    heroFilter.attack = [button.id];
                }

                updateHeroesContainer();
            });
        });

        filterTags.forEach((button) => {
            button.addEventListener("click", () => {
                if (heroFilter.tags.includes(button.id)) {
                    heroFilter.tags = heroFilter.tags.filter((tag) => tag !== button.id);
                } else {
                    heroFilter.tags.push(button.id);
                }

                updateHeroesContainer();
            });
        });

        filterName.addEventListener("input", () => {
            heroFilter.name = filterName.value;

            updateHeroesContainer();
        });
    }
};

let routes = {
    "/": "/pages/heroes.html"
};
for (let hero of heroesArray) {
    routes["/" + hero.displayName.replace(/\s/g, "").toLowerCase()] = "/pages/hero.html";
}

window.onpopstate = handleLocation;
window.route = route;

window.history.pushState({}, "", "/");

handleLocation();
