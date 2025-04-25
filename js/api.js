const API_KEY = "c9a884676df9b8ee85ba701d693634aa"; // Min personliga API-nyckel för att kommunicera med TMDB 
const BASE_URL = "https://api.themoviedb.org/3"; // Bas-URL för alla API-anrop till TMDB

// Skapar funktioner som hämtar filmer från en kategori 
export async function fetchMovies(category) {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=sv-SE&page=1`);
    
    // Kastar ett fel om något gick fel med API-anropet 
    if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av filmer");
    }
    //  Returnerar JSON-svaret från API:et 
    const data = await response.json();
    return data;  
}

// Skapar en funktion som söker efter både filmer och personer baserat på användarsökningen 
export function searchMoviesOrPersons(query) {
    // Skapar if-sats om söksträngen är tom eller innehåller mellanslag, returnerar en tom resultatlista 
    if (!query.trim()) {
      return Promise.resolve({ results: [] });
    }
//  Annars görs en sökförfrågan till TMDB:S "multi search-endpoint"
// Kan returnera både filmer och personer 
    return fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(query)}&page=1`)
      .then(res => {
        if (!res.ok) throw new Error("Något gick fel vid sökningen.");
        return res.json();
      });
  }
