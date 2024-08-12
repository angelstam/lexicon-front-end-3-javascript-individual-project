const OMDB_API_BASE_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&";

async function getOmdbMovieByIMDbId(id) {
    return (await fetchFromOmdbApi("i=" + id));
}

async function searchOmdbMovie(str, type, year, page) {
    let query = "s=" + str;
    if (type) query += "&type=" + type;
    if (year) query += "&y=" + year;
    if (year) page += "&page=" + page;

    return (await fetchFromOmdbApi(query));
}

async function fetchFromOmdbApi(query) {
    try {
        const response = await fetch(OMDB_API_BASE_URL + query);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}