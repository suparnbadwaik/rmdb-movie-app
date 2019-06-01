import React, {Component} from 'react';
import MovieDB from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import Actor from '../elements/Actor/Actor';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {

    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
    }

    componentDidMount = () => {
        if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = localStorage.getItem(`${this.props.match.params.movieId}`);
            this.setState({ ...state });
        } else {
            this.setState({ loading: true });
            const endpoint = `${MovieDB.API_URL}movie/${this.props.match.params.movieId}?api_key=${MovieDB.API_KEY}&language=${MovieDB.LANGUAGE}`;
            this.fetchMovieDetails(endpoint);
        }
    }

    fetchMovieDetails = (endpoint) => {
        fetch(endpoint)
        .then(data => data.json())      /* Convert the result into json format */
        .then(data => {
            if (data.status_code) {     /* No data found */
                this.setState({ loading: false });
            } else {
                /*
                    We also need the actors in this movie.
                    SetState method takes a callback function as a parameter
                    We will pass a function into it
                */
                this.setState({ movie: data }, () => {
                    const endpoint = `${MovieDB.API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${MovieDB.API_KEY}`;
                    fetch(endpoint)
                    .then(data => data.json())
                    .then(data => {
                        console.log(data);
                        const directors = data.crew.filter(member => member.job === 'Director');
                        console.log(directors);
                        this.setState({
                            actors: data.cast,
                            directors,
                            loading: false
                        }, () => {
                            localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state));
                        })
                    })
                });
            }
        }).catch(error => console.log(error));
    }

    render = () => {
        return (
            <div className="rmdb-movie">
                { this.state.movie ? 
                    <div>
                        <Navigation movie={this.props.location.movieName} />
                        <MovieInfo movie={this.state.movie} directors={this.state.directors} />
                        <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
                    </div>
                : null }
                { this.state.actors ? 
                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                            {this.state.actors.map((element, i) => {
                                return <Actor key={i} actor={element} />
                            })}
                        </FourColGrid>
                    </div>
                    :null }
                {!this.state.actors && !this.state.loading ? <h1>No Movie Found</h1>:null}
                {this.state.loading ? <Spinner />:null }
            </div>
        )
    }
}

export default Movie;
