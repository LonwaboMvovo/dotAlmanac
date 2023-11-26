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

        const filterName = document.getElementById("filter-name");
        const filterAtributes = document.querySelectorAll('.filter-atr');

        filterName.addEventListener("input", () => {
            heroFilter.name = filterName.value;
            updateHeroesContainer();
        });

        filterAtributes.forEach((button) => {
            button.addEventListener('click', () => {
                if (heroFilter.attribute.length === 1 && heroFilter.attribute[0] === button.id) {
                    heroFilter.attribute = ["str", "agi", "int", "all"];
                } else {
                    heroFilter.attribute = [button.id];
                }
                updateHeroesContainer();
            });
        });
    }
};

let routes = {
    "/": "/pages/heroes.html"
};
for (let hero of heroesArray) {
    routes["/" + hero.localized_name.replace(/\s/g, '').toLowerCase()] = "/pages/hero.html"
}

window.onpopstate = handleLocation;
window.route = route;

window.history.pushState({}, "", "/");
handleLocation();
