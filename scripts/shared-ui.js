export { getFavoriteElement };
import * as Favorites from "./data/favorites.js";

function getFavoriteElement(id) {
    const element = document.createElement("i");
    const isNotFavoriteTitle = "Add to favorites";
    const isFavoriteTitle = "Marked as a favorite";

    if (Favorites.isFavorite(id)) {
        element.classList.add("fa-solid");
        element.title = isFavoriteTitle;
    } else {
        element.classList.add("fa-regular");
        element.title = isNotFavoriteTitle;
    }

    element.classList.add("fa-heart");
    element.dataset.imdbId = id;

    element.addEventListener("click", event => {
        console.log("favorite", id);
        if (Favorites.isFavorite(id)) {
            Favorites.removeFromFavorites(id);
            event.target.classList.remove("fa-solid");
            event.target.classList.add("fa-regular");
            event.target.title = isNotFavoriteTitle;
        } else {
            Favorites.addToFavorites(id);
            event.target.classList.remove("fa-regular");
            event.target.classList.add("fa-solid");
            event.target.title = isFavoriteTitle;
        }
    });

    return element;
}
