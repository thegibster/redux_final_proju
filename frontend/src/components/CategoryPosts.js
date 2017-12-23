import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CategoryPosts extends Component {
    render () {

         const { posts } = this.props.posts;

        return (
            <div className="posts">
                <ol className="categories-grid">
                    { (posts.length > 0) ?
                        posts.map((post) => (
                            <div key={post.name}>
                                <li>
                                    <div className="">
                                        <div className="">
                                        </div>
                                        <div className="">{post.name}</div>
                                        <div className="">
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))

                    : <div>No Posts for this Category.</div>
                    }

                </ol>
            </div>
        )
    }
}

CategoryPosts.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = posts =>  posts ;

export default connect(mapStateToProps)(CategoryPosts);