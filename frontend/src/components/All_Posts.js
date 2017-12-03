import React, { Component } from 'react';
import {  Link  } from 'react-router-dom';
import { connect } from 'react-redux';

class All_Posts extends Component {
    render () {
        console.log("category posts", this.props.posts);
        const { posts } = this.props.posts;
        console.log("home post all", this.props)
        const  pathname =  this.props.location.pathname;


        return (
            <div className="posts">
                {/*<div>All Posts</div>*/}
                <ol className="categories-grid">
                    { (posts.length > 0) ?

                        posts.sort((a,b) => a.timestamp-b.timestamp).map((post) => (
                            <div key={post.id}>
                                <li>
                                    <div className="book">
                                        <div className="book-top">
                                            {/*<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>*/}
                                            {/*<div className="book-shelf-changer">*/}
                                            {/*<Select*/}
                                            {/*name={book.id}*/}
                                            {/*onChange={handleInputChange}*/}
                                            {/*value={`${book.shelf}`}*/}
                                            {/*/>*/}
                                            {/*</div>*/}
                                        </div>
                                        {/*<div className="category-title">Title: <Link to={`${pathname+post.id}`}>{post.title}</Link></div>*/}
                                        <div>{post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}</div>
                                        <div>Comments: {post.commentCount}</div>
                                        <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                        <Link to={`${pathname+post.id}/edit`}>Edit</Link>
                                        <div className="category-path">
                                            {/*<Link to={`/${category.path}`}>{category.path}</Link>*/}
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

function mapStateToProps(posts) {
    return posts;
}

export default connect(mapStateToProps)(All_Posts);


// export default Categories;
