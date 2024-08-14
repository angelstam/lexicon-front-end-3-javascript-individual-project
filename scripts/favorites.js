window.addEventListener("load", () => {
    renderFavorites();
});


async function renderFavorites() {
    const favorites = document.querySelector("#favorites");

    const favoriteIds = getFavorites();

    if (favoriteIds.length > 0) {
        favoriteIds.forEach(async favoriteId => {
            const movie = await getOmdbMovieByIMDbId(favoriteId);
            const e = document.createElement("h4");
            e.textContent = `${movie.Title} (${movie.Year})`;
            favorites.appendChild(e);
        });
    } else {
        const error = document.createElement("h4");
        error.textContent = "You have no favorites yet!";
        favorites.appendChild(error);
    }
}
