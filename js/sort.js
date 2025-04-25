export function handleSort(sortSelect, currentMovies, currentPersons, displayMovies, displayPersons) {
    const value = sortSelect.value;

    if (currentMovies.length > 0) {
        const sortedMovies = [...currentMovies];
        if (value === "name-asc") {
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (value === "name-desc") {
            sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
        } else if (value === "popularity-asc") {
            sortedMovies.sort((a, b) => a.popularity - b.popularity);
        } else if (value === "popularity-desc") {
            sortedMovies.sort((a, b) => b.popularity - a.popularity);
        }
        displayMovies(sortedMovies, movieList);
    }

    if (currentPersons.length > 0) {
        const sortedPersons = [...currentPersons];
        if (value === "name-asc") {
            sortedPersons.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "name-desc") {
            sortedPersons.sort((a, b) => b.name.localeCompare(a.name));
        } else if (value === "popularity-asc") {
            sortedPersons.sort((a, b) => a.popularity - b.popularity);
        } else if (value === "popularity-desc") {
            sortedPersons.sort((a, b) => b.popularity - a.popularity);
        }
        displayPersons(sortedPersons, personList);
    }
}
