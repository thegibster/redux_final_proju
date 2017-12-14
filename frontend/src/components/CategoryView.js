import React, { Component } from 'react';
// import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryPost from './CategoryPost';

class CategoryView extends Component {
    render () {
         console.log("category comp", this.props.categories.categories,'cat id ', this.props.match.params);
         const  categories  = this.props.categories.categories.filter((category) => category.name === this.props.match.params.category );
         // const filteredPosts = this.props.posts.posts.filter((post) => post.category === this.props.match.params.id);
        const filteredPosts = this.props.posts.posts.filter((post) => post.category === this.props.match.params.category);

        console.log("CategoryView ", categories)



        return (
            <div className="category">
                {/*<h1>Category:</h1>*/}

                    { (categories !== null && Object.keys(categories ).length !== 0 ) ?

                        categories.map((category) => (
                            <div key={category.name}>

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
                                        {/*<div className="">{category.name}</div>*/}
                                        <div className="">
                                            {/*<Link to={`/category/${category.path}`}>{category.path}</Link>*/}
                                            <CategoryPost posts={filteredPosts} category={category.path}/>
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

export default connect(mapStateToProps)(CategoryView);

// export default Categories;
