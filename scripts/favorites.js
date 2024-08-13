window.addEventListener("load", () => {
    renderFavorites();
});


function renderFavorites() {
    const favorites = document.querySelector("#favorites");

    const favoriteIds = getFavorites();

    if (favoriteIds.length > 0) {

        favoriteIds.forEach(favoriteId => {
            const movie = document.createElement("h4");
            movie.textContent = `# ${favoriteId} `; //${result.Title} (${result.Year})`;
            favorites.appendChild(movie);
        });
    } else {
        const error = document.createElement("h4");
        error.textContent = "You have no favorites yet!";
        favorites.appendChild(error);
    }
}
