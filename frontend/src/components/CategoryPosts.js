import React, { Component } from 'react';
// import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';

class CategoryPosts extends Component {
    render () {
            console.log("category posts", this.props.posts);
         const { posts } = this.props.posts;
         console.log("cstergy hmhmhmhm", posts)


        return (
            <div className="posts">
                {/*<h1>Category:</h1>*/}
                <ol className="categories-grid">
                    { (posts.length > 0) ?

                        posts.map((post) => (
                            <div key={post.name}>
                                <li>
                                    <div className="">
                                        <div className="">
                                            {/*<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>*/}
                                            {/*<div className="book-shelf-changer">*/}
                                                {/*<Select*/}
                                                    {/*name={book.id}*/}
                                                    {/*onChange={handleInputChange}*/}
                                                    {/*value={`${book.shelf}`}*/}
                                                {/*/>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="">{post.name}</div>
                                        <div className="">
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

export default connect(mapStateToProps)(CategoryPosts);

// export default Categories;
