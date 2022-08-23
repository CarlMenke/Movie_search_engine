const API_KEY = '383216bc3470b7b5495792c737a56154'
const DOMAIN = `https://api.themoviedb.org/3`
let currPage = 1;
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original'

const searchInput = document.getElementById('search-input')
const search =  document.getElementById('search');
const searchSection = document.getElementById('search-section');
const searchResultsContainer = document.getElementById('search-results-container');
console.log('connected')

window.addEventListener('load', async () => {
    const response = await axios.get(`${DOMAIN}/movie/popular?api_key=${API_KEY}`)

    const popularMovieList = response.data.results;

    popularMovieList.forEach((movie) =>{
        const currMovieSection = document.createElement('section');
        currMovieSection.classList.add('popular-movie-item');
        currMovieSection.addEventListener('mouseenter', () => {showDetails(event,movie)});
        const currMovieTitle = document.createElement('div');
        const currMovieImage = document.createElement('img');
        currMovieImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        currMovieTitle.innerHTML = movie.title;
        currMovieSection.appendChild(currMovieTitle);
        currMovieSection.appendChild(currMovieImage);

        document.getElementById('popular-movies').appendChild(currMovieSection);
    })
})

document.getElementById('search').addEventListener('click', async () => {

    currPage = 1;
    searchSection.innerHTML = '';
    searchResultsContainer.innerHTML = '';
    searchSection.appendChild(searchInput);
    searchSection.appendChild(search);
    searchSection.appendChild(searchResultsContainer);

    let previousPageButton = document.createElement('button');
    previousPageButton.innerText = 'Previous Page';
    let nextPageButton = document.createElement('button');
    nextPageButton.innerText = 'Next Page';

    let movieTitle = document.getElementById('search-input').value;
    const response = await axios.get(`${DOMAIN}/search/movie?api_key=${API_KEY}&query=${movieTitle}&page=${currPage}`);
    let searchedArray = response.data.results;
    
    searchedArray.forEach((movie) => {

        const currMovieSection = document.createElement('section');
        currMovieSection.classList.add('popular-movie-item')
        currMovieSection.addEventListener('mouseenter', () => {showDetails(event,movie)})
        const currMovieTitle = document.createElement('div');
        const currMovieImage = document.createElement('img');
        currMovieImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        currMovieTitle.innerHTML = movie.title;
        currMovieSection.appendChild(currMovieTitle);
        currMovieSection.appendChild(currMovieImage);
        console.log(currMovieSection);
        document.getElementById('search-results-container').appendChild(currMovieSection);
    })

    searchSection.appendChild(previousPageButton)
    searchSection.appendChild(nextPageButton);

    nextPageButton.addEventListener('click', async () => {
        currPage ++;
        document.getElementById('search-results-container').innerHTML = '';
        let movieTitle = document.getElementById('search-input').value;
        const response = await axios.get(`${DOMAIN}/search/movie?api_key=${API_KEY}&query=${movieTitle}&page=${currPage}`);
        let searchedArray = response.data.results;
    
        searchedArray.forEach((movie) => {
    
            const currMovieSection = document.createElement('section');
            currMovieSection.classList.add('popular-movie-item')
            currMovieSection.addEventListener('mouseenter', () => {showDetails(event,movie)});
            const currMovieTitle = document.createElement('div');
            const currMovieImage = document.createElement('img');
            currMovieImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            currMovieTitle.innerHTML = movie.title;
            currMovieSection.appendChild(currMovieTitle);
            currMovieSection.appendChild(currMovieImage);
    
            document.getElementById('search-results-container').appendChild(currMovieSection);
        })
    })

    previousPageButton.addEventListener('click', async () => {
        if(currPage > 1){currPage --};
        document.getElementById('search-results-container').innerHTML = '';
        let movieTitle = document.getElementById('search-input').value;
        const response = await axios.get(`${DOMAIN}/search/movie?api_key=${API_KEY}&query=${movieTitle}&page=${currPage}`);
        let searchedArray = response.data.results;
    
        searchedArray.forEach((movie) => {

            const currMovieSection = document.createElement('section');
            currMovieSection.classList.add('popular-movie-item');
            currMovieSection.addEventListener('mouseenter', () => {showDetails(event,movie)});
            const currMovieTitle = document.createElement('div');
            const currMovieImage = document.createElement('img');
            currMovieImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            currMovieTitle.innerHTML = movie.title;
            currMovieSection.appendChild(currMovieTitle);
            currMovieSection.appendChild(currMovieImage);
    
            document.getElementById('search-results-container').appendChild(currMovieSection);
        
            })
        
        })
    
})

const showDetails = (event,movie) => {
    let detailedSectionContainer = event.target;
    detailedSectionContainer.innerHTML = '';

    detailedSectionContainer.classList.add('detailed-container')
    
    let title = document.createElement('h1');
    title.classList.add('detailed-title');
    title.innerHTML = movie.title;


    let date = document.createElement('p');
    date.innerHTML = `Released: ${movie.release_date}`;
    date.classList.add('detailed-date');


    let rating = document.createElement('p');
    rating.innerHTML = `${movie.vote_average}/10 ⭐`;
    rating.classList.add('detailed-rating');


    let summary = document.createElement('p');
    summary.innerHTML = movie.overview;
    summary.classList.add('detailed-summary');

    let poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    poster.classList.add('detailed-poster');
    
    detailedSectionContainer.append(title,date,poster,rating,summary);
    
    
    detailedSectionContainer.addEventListener('mouseout', () => {revert(event,movie)})
}
const revert = (event,movie)  => {
    event.target.innerHTML = '';
    event.target.classList.add('popular-movie-item')
    const currMovieTitle = document.createElement('div');
    const currMovieImage = document.createElement('img');
    currMovieImage.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    currMovieTitle.innerHTML = movie.title;
    event.target.appendChild(currMovieTitle);
    event.target.appendChild(currMovieImage);
    event.target.classList.remove('detailed-container')
}