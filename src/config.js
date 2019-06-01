// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=fc93653da5c88e3480fc21d9c9fa19b8

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'fc93653da5c88e3480fc21d9c9fa19b8';

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

const LANGUAGE='en-US';

const MovieDB = {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  LANGUAGE
}

export default MovieDB;