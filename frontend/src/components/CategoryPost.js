import React, { Component } from 'react';
import {  Link  } from 'react-router-dom';
// import { connect } from 'react-redux';

class CategoryPost extends Component {
    render () {
        const filteredPosts = this.props.posts;
        console.log('fiiltered',filteredPosts)


        return (
            <div className="posts">
                <div>{`All ${this.props.category} Posts`}</div>
                <ol className="categories-grid">
                    { (filteredPosts.length > 0) ?

                        filteredPosts.map((post) => (
                            <div key={post.id}>
                                <li>
                                    <div className="">
                                        <div className="">Title: <Link to={`${post.id}`}>{post.title}</Link></div>
                                        <div>Content: {post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}</div>
                                        <div>Comments: {post.commentCount}</div>
                                        {/*<Link to={`${pathname+post.id}/edit`}>Edit</Link>*/}
                                        <div className="">
                                            <Link to={`/posts/${post.id}`}>View/Edit This Post</Link>
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
//
// function mapStateToProps(categories) {
//     return categories;
// }
//
// export default connect(mapStateToProps)(CategoryPost);

export default CategoryPost;
