import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryPost from './CategoryPost';

class CategoryView extends Component {
    render() {
        console.log("category comp", this.props.categories.categories, 'cat id ', this.props.match.params);
        const categories = this.props.categories.categories.filter((category) => category.name === this.props.match.params.category);
        const filteredPosts = this.props.posts.posts.filter((post) => post.category === this.props.match.params.category);

        return (
            <div className="category">

                { (categories !== null && Object.keys(categories).length !== 0 ) ?

                    categories.map((category) => (
                        <div key={category.name}>

                            <div className="">
                                <div className="">
                                </div>
                                <div className="">
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

const mapStateToProps = categories => categories;

export default connect(mapStateToProps)(CategoryView);