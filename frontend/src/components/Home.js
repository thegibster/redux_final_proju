import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import All_Posts from './All_Posts'
import { connect } from 'react-redux';


class Home extends Component {
    render () {
        console.log("nested posts const", this.props)

        return (
            <div>
                <div>Happy Browsing</div>
                <Link to="/categories">Categories</Link>
                <h3>All Posts</h3>
                {/*<Posts posts={this.props}/>*/}
                <All_Posts />
            </div>

        )
    }
}

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(Home);

// export default Home;
