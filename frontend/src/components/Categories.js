import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';

class Categories extends Component {
    render () {
         console.log("category comp", this.props.categories.categories);
         const { categories } = this.props.categories;
         console.log("everythting in props", this.props)


        return (
            <div className="category">
                {/*<h1>Category:</h1>*/}
                <ol className="categories-grid">
                    { (categories.length > 0) ?

                        categories.map((category) => (
                            <div key={category.name}>
                                <li>
                                    <div className="book">
                                        <div className="book-top">
                                        </div>
                                        <div className="category-path">
                                            <Link to={`/category/${category.path}`}>{category.path}</Link>
                                        </div>
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
