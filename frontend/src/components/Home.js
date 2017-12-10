import React, { Component } from 'react';
import AllPosts from './AllPosts'
import { connect } from 'react-redux';

class Home extends Component {
    render () {
        return (
            <div >
                <h3>Home</h3>
                {/*<Posts posts={this.props}/>*/}
                <AllPosts location={this.props.location}/>
            </div>
        )
    }
}

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(Home);

// export default Home;
