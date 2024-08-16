import * as Favorites from "./data/favorites.js";
import * as OMDb from "./data/omdb-api.js";

window.addEventListener("load", () => {
    renderFavorites();
});


async function renderFavorites() {
    const favorites = document.querySelector("#favorites");

    const favoriteIds = Favorites.getFavorites();

    if (favoriteIds.length > 0) {
        favoriteIds.forEach(async favoriteId => {
            const movie = await OMDb.getOmdbMovieByIMDbId(favoriteId);
            const e = document.createElement("h4");
            const a = document.createElement("a");
            a.href = "details.html?id=" + favoriteId;
            a.textContent = `${movie.Title} (${movie.Year})`;
            e.appendChild(a);
            favorites.appendChild(e);
        });
    } else {
        const error = document.createElement("h4");
        error.textContent = "You have no favorites yet!";
        favorites.appendChild(error);
    }
}
