import React, { Component } from 'react';
import AllPosts from './AllPosts'
import { connect } from 'react-redux';

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

const mapStateToProps = categories =>  categories;

export default connect(mapStateToProps)(Home);
