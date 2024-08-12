function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function setFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addToFavorites(id) {
    const favorites = getFavorites();

    // Avoid duplicates
    if (favorites.findIndex(favorite => favorite === id) === -1) {
        favorites.push(id);
        setFavorites(favorites);
    }
}

function removeFromFavorites(id) {
    const favorites = getFavorites();
    setFavorites(favorites.filter(favorite => favorite !== id));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}