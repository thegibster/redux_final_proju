import React, { Component } from 'react';
import AllPosts from './AllPosts'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
    render () {
        return (
            <div >
                <h3>Home</h3>
                <AllPosts location={this.props.location}/>
            </div>
        )
    }
}

Home.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = categories =>  categories;

export default connect(mapStateToProps)(Home);
