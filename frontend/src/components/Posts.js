import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';

class Posts extends Component {
    render () {
            console.log("category posts", this.props.posts);
         const { posts } = this.props.posts;
         console.log("cstergy hmhmhmhm", posts)


        return (
            <div className="posts">
                <div>All Posts</div>
                <ol className="categories-grid">
                    { (posts.length > 0) ?

                        posts.map((post) => (
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

export default connect(mapStateToProps)(Posts);

// export default Categories;