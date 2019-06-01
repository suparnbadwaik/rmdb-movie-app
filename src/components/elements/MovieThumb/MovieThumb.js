import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css'

/*
const MovieThumb = (props) => {
    // to replace and start using the property names directly without using props. eg props.movieName
    // we will remove props from the parameter and pass in all the properties that props contain
    return (
        <div className="rmdb-moviethumb">
            {props.clickable ? 
                <Link to={{ pathname: `/${props.movieId}`, movieName: `${props.movieName}`}}>
                    <img src={props.image} alt={props.movieName} />
                </Link> :
                <img src={props.image} alt={props.movieName} />
            }
        </div>
    )
}
*/

const MovieThumb = ({clickable, movieId, movieName, image}) => {
    return (
        <div className="rmdb-moviethumb">
            {clickable ? 
                <Link to={{ pathname: `/${movieId}`, movieName: `${movieName}`}}>
                    <img src={image} alt={movieName} />
                </Link> :
                <img src={image} alt={movieName} />
            }
        </div>
    )
}

MovieThumb.propTypes = {
    image: PropTypes.string,
    movieName: PropTypes.string,
    movieId: PropTypes.number
}

export default MovieThumb;