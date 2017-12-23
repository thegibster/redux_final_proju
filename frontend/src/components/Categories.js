import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Categories extends Component {
    render () {
        const { categories } = this.props.categories;

        return (
            <div className="category">

                <ol className="categories-grid">
                    { (categories.length > 0) ?

                        categories.map((category) => (
                            <div key={category.name}>
                                <li>
                                    <div className="">
                                        <div className="">
                                        </div>
                                        <div className="">
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

Categories.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};


const mapStateToProps = categories =>  categories ;

export default connect(mapStateToProps)(Categories);
