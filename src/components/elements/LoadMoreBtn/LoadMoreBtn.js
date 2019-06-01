import React from 'react';
import './LoadMoreBtn.css';

const LoadMoreBtn = (props) => {
    return (
        <div>
            {/* props.onClick will be replaced by value of the onClick property passed to this component viz this.loadMoreMovies */}
            <button className="rmdb-loadmorebtn" onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default LoadMoreBtn;