import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';

//might need to either filter from the state of posts right here
//or actually execute the api call for a single post

class Post extends Component {
    render () {
        console.log("category posts");
        // const { post } = this.props.post;
        const postID = this.props;
        console.log(`POST component ${postID} `, postID.location.pathname);
        console.log(postID);
        // const singlePost = this.props.posts.filter(post => post.id === postID.match.params.id);


    // return(<div>hi</div>)
        return (
            <div className="posts">
                <div>Post</div>
                <ol className="categories-grid">
                    { (this.props.posts.posts.length > 0) ?

                        this.props.posts.posts.filter(post => post.id === postID.match.params.id).map((post) => (
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
                                        <div className="category-title">Title: <Link to={`/${post.id}`}>{post.title}</Link></div>
                                        <div>{post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}</div>
                                        <div>Comments: {post.commentCount}</div>
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

export default connect(mapStateToProps)(Post);
// export default  Post;

// export default Categories;
