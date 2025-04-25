// importera funktioner för att hämta filmer och personer från API 
import { fetchMovies, searchMoviesOrPersons } from "./api.js";
import { displayMovies, displayPersons } from "./render.js";
import { handleSort } from "./sort.js";

// Hämtar HTML-element  från DOM med id
const topRatedBtn = document.getElementById("topRatedBtn");
const popularBtn = document.getElementById("popularBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieList = document.getElementById("movieList");
const personList = document.getElementById("personList");
const movieHeading = document.getElementById("movieHeading");
const personHeading = document.getElementById("personHeading");
const sortSelect = document.getElementById("sort-select");

// Lägger till en eventlyssnare för sortering när anvndaren ändrar i menyn
sortSelect.addEventListener("change", () => 
    handleSort(sortSelect, currentMovies, currentPersons, displayMovies, displayPersons, movieList, personList)
);
// Skapar variabler för att hålla nuvarande filmer och personer i minnet 
  let currentMovies = [];
  let currentPersons = [];

// Skapar eventlyssnare, hämtar topp-rankade filmer från API
topRatedBtn?.addEventListener("click", () => {
    fetchMovies("top_rated").then(data => {
            currentMovies = data.results.slice(0, 10);
            displayMovies(currentMovies, movieList, false); 
            personHeading.innerHTML= '';
            movieHeading.style.display = "block";
            personHeading.style.display = "none";
    });
});

// Skapar evetlyssnare, hämtar populära filmer från API
popularBtn?.addEventListener("click", () => {
    fetchMovies("popular").then(data => {
        currentMovies = data.results.slice(0, 10);
        displayMovies(currentMovies, movieList, false);
        personList.innerHTML =''; // Tömmer personlistan och döljer dess rubrik
        movieHeading.style.display = "block";
        personHeading.style.display = "none";
    });
});

// Skapar enevtlyssnare, hämtar sökning efter filmer eller personer 
searchBtn?.addEventListener("click", async (event) => {
    event.preventDefault(); // Hindrar formuläret att skicka om sidan 
    const query = searchInput.value.trim();
    if (!query) return; // Om sökfältet är tomt ska inget hända 
  
    try {
      const data = await searchMoviesOrPersons(query);
   
// Filtrerar ut filmer och personer ur resultatet 
const movies = data.results.filter(item => item.media_type === "movie");
const persons = data.results.filter(item => item.media_type === "person");
  
currentMovies = movies;
currentPersons = persons;
  
// Rensar gamla resultat från sidan 
      movieList.innerHTML = '';
      personList.innerHTML = '';
 
    // Visar filmer om några finns 
      if (movies.length > 0) {
        displayMovies(movies, movieList, true);
        movieHeading.style.display = "block";
      } else {
        movieHeading.style.display = "none";
        alert("Inga filmer hittades.");
      }
  
      // Visar personer om några finns 
      if (persons.length > 0) {
        displayPersons(persons, personList);
        personHeading.innerHTML = "Personer";
        personHeading.style.display = "block";
      } else {
        personHeading.style.display = "none";
        alert("Inga personer hittades.");
      }
    } catch (err) {
      console.error("Fel vid sökning:", err);
      alert("Det gick inte att utföra sökningen.");
    }
  });
  
