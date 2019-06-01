import React, { Component } from 'react';
import MovieDB from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

/*
CONTENTS OF THE HOME PAGE
    Header
    HeroImage/Banner
    Searchbox
    Four Column Grid
    Movie Thumbs
    LoadMore button
    Spinner
*/

class Home extends Component {

    state = {
        heroImage: '',          /* Holds the header image */
        searchTerm: '',         /* Holds the text/movie name we enter in the search box */
        movies: [],             /* Holds list of movies and its details */
        currentPage: 1,         /* Holds the current page number of the many items shown */
        totalPages: 0,          /* Holds the total number of pages */
        loading: false          /* Decides if the page is still loading for spinner be shown */
    }


    /* Load the movies when the component loads */
    componentDidMount = () => {
        if(localStorage.getItem('HomeState')) {
            const state = JSON.parse(localStorage.getItem('HomeState'));
            this.setState({...state});
        } else {
            this.setState({ loading: true });
            /* Refer https://developers.themoviedb.org/3/movies/get-popular-movies */
            const popularMoviesEndpoint = `${MovieDB.API_URL}movie/popular?api_key=${MovieDB.API_KEY}&language=${MovieDB.LANGUAGE}&page=${this.state.currentPage}`;
            this.fetchMovies(popularMoviesEndpoint);
        }
    }


    /*  Fetch Movies based on the endpoint. It is a generic function.
        Movies can be fetched based on the popularity, search criteria, etc.
    */
    // fetchMovies = (endpoint) => {
    //     fetch(endpoint)
    //     .then(data => data.json())          /* Convert raw data to json */
    //     .then(data => {
    //         this.setState({ 
    //             heroImage: this.state.heroImage || data.results[0],
    //             movies: [ ...this.state.movies, ...data.results ],  /* 1st param would retain the original array, 2nd would append new results to the original array */
    //             currentPage: data.page,
    //             totalPages: data.total_pages,
    //             loading: false              /* Stop the spinner */
    //         }, () => {
    //             if(this.state.searchTerm === '') {  /* Dont save search results in local storage */
    //             /* Its not secure since anyone can view the data from developer tools in the Application tab */
    //                 localStorage.setItem('HomeState', JSON.stringify(this.state));
    //             }
    //         });
    //     });
    // }it

    /* Using Async awa */
    fetchMovies = async endpoint => { 
        const { heroImage, movies, searchTerm } = this.state;
        const data = await(await fetch(endpoint)).json();
        this.setState({ 
            heroImage: heroImage || data.results[0],
            movies: [ ...movies, ...data.results ],  /* 1st param would retain the original array, 2nd would append new results to the original array */
            currentPage: data.page,
            totalPages: data.total_pages,
            loading: false              /* Stop the spinner */
        }, () => {
            if(searchTerm === '') {  /* Dont save search results in local storage */
            /* Its not secure since anyone can view the data from developer tools in the Application tab */
                localStorage.setItem('HomeState', JSON.stringify(this.state));
            }
        });
    }

    
    /* Filter the movies in the API */
    searchMovies = (newSearchTerm) => {
        this.setState({
            movies: [],
            loading: true,
            searchTerm: newSearchTerm
        });

        let endpoint = '';
        if(newSearchTerm === '') {
            endpoint = `${MovieDB.API_URL}movie/popular?api_key=${MovieDB.API_KEY}&language=${MovieDB.LANGUAGE}&page=${this.state.currentPage}`;
        } else {
            endpoint = `${MovieDB.API_URL}search/movie?api_key=${MovieDB.API_KEY}&query=${newSearchTerm}&language=${MovieDB.LANGUAGE}&page=${this.state.currentPage}`;
        }

        this.fetchMovies(endpoint);
    }

    /* Load movies from the next page */
    loadMoreMovies = () => {
        let endpoint;
        if (this.state.searchTerm === '') {
            endpoint = `${MovieDB.API_URL}movie/popular?api_key=${MovieDB.API_KEY}&language=${MovieDB.LANGUAGE}&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${MovieDB.API_URL}search/movie?api_key=${MovieDB.API_KEY}&query=${this.state.searchTerm}&language=${MovieDB.LANGUAGE}&page=${this.state.currentPage + 1}&include_adult=false`;
        }

        this.fetchMovies(endpoint);
    }

    /* HTML Code to be returned to the root DOM element */
    render = () => { 
        const { heroImage, searchTerm, movies, currentPage, totalPages, loading } = this.state;

        return(
            <div className="rmdb-home">
                { heroImage ? 
                <div>
                    {/* Hero image
                    Search box */}
                    <HeroImage
                        image={`${MovieDB.IMAGE_BASE_URL}${MovieDB.BACKDROP_SIZE}${heroImage.backdrop_path}`}
                        title={heroImage.original_title}
                        text={heroImage.overview} />
                    <SearchBar callback={this.searchMovies} />
                </div> : null }

                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={loading}>
                            { movies.map((element, i) => {
                                return <MovieThumb
                                            key={i}
                                            clickable={true}
                                            movieId={element.id}
                                            movieName={element.original_title}
                                            image={element.poster_path ? `${MovieDB.IMAGE_BASE_URL}${MovieDB.POSTER_SIZE}${element.poster_path}`: './images/no_image.jpg' } />
                            })}
                    </FourColGrid>
                    {loading ? <Spinner /> : null}
                    {(currentPage < totalPages) && !loading ? 
                        <LoadMoreBtn text="Load more movies..." onClick={this.loadMoreMovies} /> : null 
                    }
                </div>
            </div>
        )
    }
}

export default Home;