import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import Category_Post from './Category_Post';

class Category_View extends Component {
    render () {
         console.log("category comp", this.props.categories.categories);
         const  categories  = this.props.categories.categories.filter((category) => category.name === this.props.match.params.id );
         const filteredPosts = this.props.posts.posts.filter((post) => post.category === this.props.match.params.id);
         console.log("everythting in props", categories)


        return (
            <div className="category">
                {/*<h1>Category:</h1>*/}

                    { (categories !== null && Object.keys(categories ).length !== 0 ) ?

                        categories.map((category) => (
                            <div key={category.name}>

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
                                        {/*<div className="category-title">{category.name}</div>*/}
                                        <div className="category-path">
                                            {/*<Link to={`/category/${category.path}`}>{category.path}</Link>*/}
                                            <Category_Post posts={filteredPosts} category={category.path}/>
                                        </div>
                                    </div>

                            </div>
                        ))

                    : <div>Nothing to See here</div>
                    }


            </div>
        )
    }
}

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(Category_View);

// export default Categories;
