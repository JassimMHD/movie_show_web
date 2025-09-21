const movieContainer = document.getElementById('movie-container');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


async function fetchMovies(query) {
  loader.style.display = 'block'; 
  movieContainer.innerHTML = '';

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=9393b0c9`);
    const data = await response.json();

    if(data.Search) {
      data.Search.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/250x350'}" alt="${movie.Title}">
          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        `;
        movieContainer.appendChild(movieCard);
      });
    } else {
      movieContainer.innerHTML = '<p>No movies found!</p>';
    }
  } catch(error) {
    movieContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
}


fetchMovies('Batman');


searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if(query) fetchMovies(query);
});


searchInput.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    const query = searchInput.value.trim();
    if(query) fetchMovies(query);
  }
});
