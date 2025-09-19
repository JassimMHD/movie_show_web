const API_KEY = "9393b0c9";

async function getMovies() {
  const query = document.getElementById("movieInput").value;

  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
  );
  console.log("response",response);
  
  const data = await response.json();

  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  if (data.Response === "True") {
    data.Search.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");
      movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
          `;
      container.appendChild(movieDiv);
    });
  } else {
    container.innerHTML = "<h2>No results found</h2>";
  }
}
