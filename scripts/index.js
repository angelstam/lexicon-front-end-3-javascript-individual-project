import { getFormData } from "./shared.js";
import * as OMDb from "./data/omdb-api.js";
import { getFavoriteElement, getE } from "./shared-ui.js";
import * as Cache from "./data/cache.js";

const LAST_SEARCH_RESULT_CACHE_KEY = "last-search-result";

window.addEventListener("load", () => {
    setupSearchListener();
    setupLoadMoreSearchResultsListener();

    if (Cache.existsInCache(LAST_SEARCH_RESULT_CACHE_KEY)) {
        restoreSearchFromCache();
    }
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
    const answer = await OMDb.searchOmdbMovie(search.query, search.type, search.year);

    answer.SearchQuery = search;

    getE("#search-results").textContent = "";
    getE("#num-results").textContent = "";

    Cache.removeFromCache(LAST_SEARCH_RESULT_CACHE_KEY);

    if (answer.Response === "True") {
        Cache.storeInCache(LAST_SEARCH_RESULT_CACHE_KEY, answer);

        renderSearchResultAnswer(answer);
        updateMoreSearchResultsElement();
    } else if (answer.Error) {
        const error = document.createElement("h4");
        error.textContent = answer.Error;
        getE("#search-results").appendChild(error);
    }
}

function renderSearchResultAnswer(answer) {
    getE("#num-results").textContent = `(${answer.totalResults} results found)`;

    answer.Search.forEach(result => {
        const h4 = document.createElement("h4");
        const a = document.createElement("a");
        a.href = "details.html?id=" + result.imdbID;
        a.textContent = result.Title + " (" + result.Year + ")";
        h4.appendChild(a);
        h4.appendChild(getFavoriteElement(result.imdbID));
        getE("#search-results").appendChild(h4);
    });
}

function restoreSearchFromCache() {
    const answer = Cache.retrieveFromCache(LAST_SEARCH_RESULT_CACHE_KEY);

    if (answer.SearchQuery) {
        document.forms.search.query.value = answer.SearchQuery.query;
        document.forms.search.year.value = answer.SearchQuery.year;
        document.forms.search.type.value = answer.SearchQuery.type;
    }

    if (answer.Response === "True") {
        getE("#search-results").textContent = "";
        renderSearchResultAnswer(answer);
    }
}

function setupLoadMoreSearchResultsListener() {
    updateMoreSearchResultsElement();

    getE("#more-results").addEventListener("click", async event => {
        // Load another page of the results.
        if (hasMoreSearchResultsToLoad()) {
            const lastAnswer = Cache.retrieveFromCache(LAST_SEARCH_RESULT_CACHE_KEY);
            const search = lastAnswer.SearchQuery;

            // Increment page
            if (!search.page) {
                search.page = 1;
            }
            search.page++;

            const answer = await OMDb.searchOmdbMovie(search.query, search.type, search.year, search.page);

            if (answer.Response === "True") {
                // Update the cached search result.
                lastAnswer.SearchQuery.page = search.page;
                lastAnswer.totalResults = answer.totalResults;
                lastAnswer.Search = lastAnswer.Search.concat(answer.Search);
                Cache.storeInCache(LAST_SEARCH_RESULT_CACHE_KEY, lastAnswer);

                renderSearchResultAnswer(answer);
                updateMoreSearchResultsElement();
            }
        }
    });
}

function hasMoreSearchResultsToLoad() {
    const answer = Cache.retrieveFromCache(LAST_SEARCH_RESULT_CACHE_KEY);

    if (answer && answer.totalResults > 10) {
        if (!answer.SearchQuery.page) {
            return true;
        }
        if (answer.Search.length < answer.totalResults) {
            return true;
        }
    }
    return false;
}

function updateMoreSearchResultsElement() {
    if (hasMoreSearchResultsToLoad()) {
        getE("#more-results").style.display = "inline";
    } else {
        getE("#more-results").style.display = "none";
    }
}