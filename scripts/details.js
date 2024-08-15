window.addEventListener("load", () => {
    renderDetails();
});


async function renderDetails() {
    const title = document.querySelector("title");
    const heading = document.querySelector("#details-heading");

    const detailId = getIdFromQueryString();

    if (!detailId) {
        heading.textContent = "Not Found!";
        return;
    }

    const movie = await getOmdbMovieByIMDbId(detailId);

    if (movie === false) {
        heading.textContent = "Not Found!";
        return;
    }

    title.textContent = movie.Title;
    heading.textContent = `${movie.Title} (${movie.Year})`;

    getE("#actors").textContent = movie.Actors;
    getE("#awards").textContent = movie.Awards;
    getE("#country").textContent = movie.Country;
    getE("#director").textContent = movie.Director;
    getE("#genre").textContent = movie.Genre;
    getE("#plot").textContent = movie.Plot;

    getE("#poster").src = movie.Poster;
    getE("#poster").alt = "Poster for " + movie.Title;


    const ratings = getE("#ratings");
    movie.Ratings.forEach(rating => {
        appendDtDdToElement(ratings, rating.Source, rating.Value);
    })
}

function getE(selector) {
    return document.querySelector(selector);
}

function appendDtDdToElement(element, dtText, ddText) {
    const dt = document.createElement("dt");
    dt.textContent = dtText;
    const dd = document.createElement("dd");
    dd.textContent = ddText;
    element.appendChild(dt);
    element.appendChild(dd);
}
