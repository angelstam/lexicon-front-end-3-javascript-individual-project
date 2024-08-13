window.addEventListener("load", () => {
    setupSearchListener();
});

function setupSearchListener() {
    document.forms.search.addEventListener("submit", event => {
        event.preventDefault();
        searchListenerAction(event);
    });
    document.forms.search.query.addEventListener("keydown", event => {
        if (event.key === 'Enter') {
            searchListenerAction(event);
        }
    });
    document.forms.search.year.addEventListener("keydown", event => {
        if (event.key === 'Enter') {
            searchListenerAction(event);
        }
    });
}

function searchListenerAction(event) {
    const search = getFormData(document.forms.search);

    if (search.query) {
        renderSearchResults(search);
    } else {
        console.log("empty search.query", search);
    }

    return search;
}

async function renderSearchResults(search) {
    const answer = await searchOmdbMovie(search.query, search.type, search.year);
    const searchResults = document.querySelector("#search-results");
    const numResults = document.querySelector("#num-results");
    searchResults.textContent = "";
    numResults.textContent = "";

    if (answer.Response === "True") {
        numResults.textContent = `(${answer.totalResults} results found)`;

        answer.Search.forEach(result => {
            const h4 = document.createElement("h4");
            h4.textContent = result.Title + " (" + result.Year + ")";
            h4.appendChild(getFavoriteElement(result.imdbID));
            searchResults.appendChild(h4);
        });
    } else if (answer.Error) {
        const error = document.createElement("h4");
        error.textContent = answer.Error;
        searchResults.appendChild(error);
    }
}

function getFavoriteElement(id) {
    const element = document.createElement("i");

    if (isFavorite(id)) {
        element.classList.add("fa-solid");
    } else {
        element.classList.add("fa-regular");
    }

    element.classList.add("fa-heart");
    element.dataset.imdbId = id;

    element.addEventListener("click", event => {
        console.log("favorite", id);
        if (isFavorite(id)) {
            removeFromFavorites(id);
            event.target.classList.remove("fa-solid");
            event.target.classList.add("fa-regular");
        } else {
            addToFavorites(id);
            event.target.classList.remove("fa-regular");
            event.target.classList.add("fa-solid");
        }
    });

    return element;
}
