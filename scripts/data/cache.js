function storeInCache(cacheId, data) {
    localStorage.setItem("cache-" + cacheId, JSON.stringify(data));
}

function retrieveFromCache(cacheId) {
    return JSON.parse(localStorage.getItem("cache-" + cacheId));
}

function removeFromCache(cacheId) {
    localStorage.removeItem("cache-" + cacheId);
}

function existsInCache(cacheId) {
    return localStorage.getItem("cache-" + cacheId) !== null;
}
