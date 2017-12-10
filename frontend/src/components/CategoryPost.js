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
                                        {/*<Link to={`${pathname+post.id}/edit`}>Edit</Link>*/}
                                        <div className="category-path">
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
