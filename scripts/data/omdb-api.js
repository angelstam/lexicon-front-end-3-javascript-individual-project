export { getOmdbMovieByIMDbId, searchOmdbMovie };
import * as Cache from "./cache.js";
import { OMDB_API_KEY } from "../secrets.js";

const OMDB_API_BASE_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&";

async function getOmdbMovieByIMDbId(id, updateCache = false) {
    if (Cache.existsInCache(id) && !updateCache) {
        return Cache.retrieveFromCache(id);
    } else {
        const movie = await fetchFromOmdbApi("i=" + id + "&plot=full");

        if (id === movie.imdbID) {
            Cache.storeInCache(id, movie);
            return movie;
        } else {
            console.warn("Requested ID does not match received imdbId", movie);
            return false;
        }
    }
}

async function searchOmdbMovie(str, type, year, page) {
    let query = "s=" + str;
    if (type) query += "&type=" + type;
    if (year) query += "&y=" + year;
    if (page) query += "&page=" + page;

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