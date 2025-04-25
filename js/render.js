// Skapar en funktion för att visa en lista med filmer på sidan 
export function displayMovies(movies, container, showDescription = true) {
    movieList.innerHTML = ''; // Rensar innehållet inna nya filmer läggs till  
    movies.forEach(movie => { // Loopa igenom varje filmobjekt i listan 
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        // Bygger bildens URL omder finns en poster, annars används en platshållarbild 
        const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image";

            // Skapar HTML-innehåll för filmen
        movieElement.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p><strong>Release:</strong> ${movie.release_date || "Okänt"}</p>
            <p><strong>Rating:</strong> ${movie.vote_average ?? "Ej betygsatt"}</p>
            ${showDescription ? `<p><strong>Beskrivning:</strong> ${movie.overview || "Ingen beskrivning tillgänglig."}</p>` : ""}
        `;
        movieList.appendChild(movieElement);
    });
}



// Skapar en funktion för att visa en lista me personer 
export function displayPersons(persons) {
    personList.innerHTML = ''; // Rensar innehållet 
    persons.forEach(person => {
        const personElement = document.createElement("div"); // Skapar nytt div-element för personen
        personElement.classList.add("person");
        personElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${person.profile_path}" alt="${person.name}">
            <h2>${person.name}</h2>
            <p>Popularity: ${person.popularity}</p>
            <p>Known for: ${person.known_for_department}</p>
            <div>
                <h3>Movies:</h3>
                <ul>
                    ${person.known_for.filter(item => item.media_type === "movie").map(item => `<li>Movie: ${item.title}</li>`).join('')}
                </ul>
                <h3>TV Shows:</h3>
                <ul>
                    ${person.known_for.filter(item => item.media_type === "tv").map(item => `<li>TV: ${item.name}</li>`).join('')}
                </ul>
            </div>
        `;
        personList.appendChild(personElement);
    });
}