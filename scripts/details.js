import { getIdFromQueryString } from "./shared.js";
import * as OMDb from "./data/omdb-api.js";
import { getFavoriteElement, getE } from "./shared-ui.js";

window.addEventListener("load", () => {
    renderDetails();
});


async function renderDetails() {
    const title = getE("title");
    const heading = getE("#details-heading");
    const includedDetails = [
        'Actors',
        'Awards',
        'Country',
        'Director',
        'Genre',
        'Language',
        'Released',
        'Runtime',
        'Writer',
    ];

    const detailId = getIdFromQueryString();

    if (!detailId) {
        heading.textContent = "Not Found!";
        return;
    }

    const movie = await OMDb.getOmdbMovieByIMDbId(detailId);

    if (movie === false) {
        heading.textContent = "Not Found!";
        return;
    }

    // Render Title
    title.textContent = movie.Title;
    heading.textContent = `${movie.Title} (${movie.Year})`;

    // Render Plot and Favorite icon
    const favoriteElement = getFavoriteElement(detailId);
    getE("#favorite-icon").appendChild(favoriteElement);
    getE("#plot > p").textContent = movie.Plot;

    // Render Details
    const detailDescription = getE("#details > dl");
    includedDetails.forEach(detailName => {
        appendDtDdToElement(detailDescription, detailName, movie[detailName]);
    });

    // Set Poster
    getE("#poster").src = movie.Poster;
    getE("#poster").alt = `Poster for ${movie.Title} (${movie.Year})`;

    // Render Ratings
    const ratings = getE("#ratings");
    movie.Ratings.forEach(rating => {
        appendDtDdToElement(ratings, rating.Source, rating.Value);
    })
}

// Helper to add an item to a description list
function appendDtDdToElement(element, dtText, ddText) {
    const dt = document.createElement("dt");
    dt.textContent = dtText;
    const dd = document.createElement("dd");
    dd.textContent = ddText;
    element.appendChild(dt);
    element.appendChild(dd);
}
