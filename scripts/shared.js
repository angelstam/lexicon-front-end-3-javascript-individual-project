export { getFormData, getIdFromQueryString };

function getFormData(form) {
    return Object.fromEntries((new FormData(form)).entries());
}

function getIdFromQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
  }
