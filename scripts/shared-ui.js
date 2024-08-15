function getFavoriteElement(id) {
    const element = document.createElement("i");
    const isNotFavoriteTitle = "Add to favorites";
    const isFavoriteTitle = "Marked as a favorite";

    if (isFavorite(id)) {
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
        if (isFavorite(id)) {
            removeFromFavorites(id);
            event.target.classList.remove("fa-solid");
            event.target.classList.add("fa-regular");
            event.target.title = isNotFavoriteTitle;
        } else {
            addToFavorites(id);
            event.target.classList.remove("fa-regular");
            event.target.classList.add("fa-solid");
            event.target.title = isFavoriteTitle;
        }
    });

    return element;
}
