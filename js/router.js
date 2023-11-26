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
    }
};

let routes = {
    "/": "/pages/heroes.html"
};
for (let hero of heroesArray) {
    routes["/" + hero.localized_name] = "/pages/hero.html"
}

window.onpopstate = handleLocation;
window.route = route;

window.history.pushState({}, "", "/");
handleLocation();