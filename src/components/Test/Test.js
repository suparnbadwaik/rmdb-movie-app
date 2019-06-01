import React, { Component } from 'react';

class PropsAndState extends Component {
    render () {
        return (
            <Alpha />
        )
    }
}
export default PropsAndState;

class Alpha extends Component {
    state = {
        counter: 1,
        alphaValue: 'Data from Alpha'
    }

    clickButton = () => {
        console.log(this.state.counter);
        let incCounter = this.state.counter;
        incCounter += 1;

        this.setState({
            counter: incCounter
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.clickButton}>Increment Counter</button>
                <Beta fromAlpha={this.state.alphaValue} />
            </div>
        )
    }
}

class Beta extends Component {
    state = {
        alphaValue: this.props.fromAlpha,
        betaValue: 'This is data from Beta'
    }

    render () {
        return (
            <div>
                <p>Alpha prop value => {this.state.alphaValue}</p>
                <p>Beta value : {this.state.betaValue}</p>
            </div>
        )
    }
}