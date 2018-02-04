import React, { Component } from 'react';

import { Link } from 'react-router-dom'


class Acknowledgement extends Component {
    render() {
    	var { match } = this.props;
        console.log(match);
        return (
            <div>
                <p>New Group <b>{match.params.groupName}</b> has been created.</p>
                <img src="https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg" height="500" />
                <br />
                <Link to="/">Back</Link>
            </div>
        );
    } 
}

export default Acknowledgement;