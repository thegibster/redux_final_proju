import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import PropTypes from 'prop-types';

class AllPosts extends Component {
    state = {
        sortBy: ''
    }
    handleSortByChange = (e) => {
        console.log('state changed srt to', e.target.value)
        this.setState({sortBy: e.target.value});
    }
    curriedFilter = (filterToUse, posts, pathname) => {
        if (filterToUse !== '') {
            let filter = filterToUse.toString();
            return (posts.sort((a, b) => a[filter] - b[filter]).map((post) => (
                <div key={post.id}>
                    <li>
                        <div className="">
                            <div className="">Title: <Link
                                to={`${post.category}${pathname + post.id}`}>{post.title}</Link></div>
                            <div>Content: {post.body}</div>
                            <div>By: {post.author}</div>
                            <div>Category: {post.category}</div>
                            <div>Vote Score: {post.voteScore}</div>
                            <div>Comments: {post.commentCount}</div>
                            <Link to={`posts${pathname + post.id}/edit`}>Edit Post</Link>
                            <div className="">
                            </div>
                        </div>
                    </li>
                </div>
            )))
        } else {
            return (
                posts.map((post) => (
                        <div key={post.id}>
                            <li>
                                <div className="">
                                    <div className="">
                                    </div>
                                    <div className="">Title: <Link
                                        to={`${post.category}${pathname + post.id}`}>{post.title}</Link></div>
                                    <div>{post.body}</div>
                                    <div>By: {post.author}</div>
                                    <div>Category: {post.category}</div>
                                    <div>Vote Score: {post.voteScore}</div>
                                    <div>Comments: {post.commentCount}</div>
                                    <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                    <Link to={`posts${pathname + post.id}/edit`}>Edit</Link>
                                    <div className="">
                                    </div>
                                </div>
                            </li>
                        </div>
                    )
                )
            )
        }
    };

    render() {
        const options = [{name: 'voteScore'}, {name: 'timestamp'}];
        const {posts} = this.props.posts;
        const pathname = this.props.location.pathname;

        return (
            <div className="posts">
                <div className="smallerSelectDiv">
                    <Select name="sortby" label="Sort By:" required value={this.state.sortBy}
                            onChange={this.handleSortByChange}>
                        <Option value='' label="None">None</Option>
                        {
                            options.map((sortOption) => (
                                    <Option key={sortOption.name} value={sortOption.name}
                                            label={sortOption.name.toUpperCase()}/>
                                )
                            )
                        }
                    </Select>
                </div>
                <ol className="categories-grid">
                    { (posts.length > 0) ?
                        this.curriedFilter(this.state.sortBy, posts, pathname)
                        : <div>No Posts for this Category.</div>
                    }

                </ol>
            </div>
        )
    }
}

AllPosts.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = posts => posts;

export default connect(mapStateToProps)(AllPosts);
