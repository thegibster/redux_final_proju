import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';

class Categories extends Component {
    render () {
            console.log("category comp", this.props.categories.categories);
         const { categories } = this.props.categories;
         console.log("cstergy hmhmhmhm", categories)


        return (
            <div className="category">
                <ol className="categories-grid">
                    { (categories.length > 0) ?

                        categories.map((category) => (
                            <div key={category.name}>
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
                                        {/*<div className="category-title">{category.name}</div>*/}
                                        <div className="category-path"><Link to={`/${category.path}`}>{category.path}</Link></div>
                                    </div>
                                </li>
                            </div>
                        ))

                    : <div>Nothing to See here</div>
                    }

                </ol>
            </div>
        )
    }
}

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(Categories);

// export default Categories;
