import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {  Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PostActions  from '../actions/post_actions';


class Posts extends Component {

    render () {

         const { posts } = this.props.posts;

         const  pathname =  this.props.location.pathname;



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
                                        <div className="category-title">Title: <Link to={`${pathname+post.id}`}>{post.title}</Link></div>
                                        <div>Content: {post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}</div>
                                        <div>Comments: {post.commentCount}</div>
                                        <Link to={`${pathname+post.id}`}>Edit</Link>
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

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(PostActions,dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Posts);

// export default Categories;
