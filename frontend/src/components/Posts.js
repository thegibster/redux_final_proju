import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {  Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PostActions  from '../actions/post_actions';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

class Posts extends Component {
    state = {
        sortBy:''
    }
    handleSortByChange = (e) => {
        console.log('state changed srt to',e.target.value)
        this.setState({sortBy: e.target.value});
    }

    render () {
        const options = [{name:'voteScore'},{name:'timestamp'}];
        const { posts } = this.props.posts;
        const  pathname =  this.props.location.pathname;

        const curriedFilter = (filterToUse) => {
            if(filterToUse !=='') {
                console.log(filterToUse !=='')
                let filter = filterToUse.toString();
                console.log(filterToUse,'thie filter seecltin wors',posts.sort((a, b) => a[filter] - b[filter]))
                return (posts.sort((a, b) => a.filterToUse - b.filterToUse).map((post) => (
                    <div key={post.id}>
                        <li>
                            <div className="book">

                                <div className="category-title">Title: <Link to={`${pathname +"/"+ post.id}`}>{post.title}</Link></div>
                                <div>Content: {post.body}</div>
                                <div>By: {post.author}</div>
                                <div>Category: {post.category}</div>
                                <div>Vote Score: {post.voteScore}</div>
                                <div>Comments: {post.commentCount}</div>
                                <Link to={`${pathname+"/"+post.id}/edit`}>Edit Post</Link>
                                <div className="category-path">
                                    {/*<Link to={`/${category.path}`}>{category.path}</Link>*/}
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
                                    <div className="book">
                                        <div className="book-top">

                                        </div>
                                        <div className="category-title">Title: <Link to={`${pathname +"/"+ post.id}`}>{post.title}</Link></div>
                                        <div>{post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}</div>
                                        <div>Comments: {post.commentCount}</div>
                                        <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                        <Link to={`${pathname +"/"+ post.id}/edit`}>Edit</Link>
                                        <div className="category-path">
                                            {/*<Link to={`/${category.path}`}>{category.path}</Link>*/}
                                        </div>
                                    </div>
                                </li>
                            </div>
                        )
                    ))
            }
        };

        const renderContent = (theFilter) => {

            switch(theFilter){
                case 'voteScore':
                    return curriedFilter('voteScore');
                case 'timestamp':
                    return curriedFilter('timestamp');
                default:
                    return curriedFilter('')
            }
        };

        return (
            <div className="posts">
                {/*<div>All Posts</div>*/}
                <div className="smallerSelectDiv">
                    <Select name="sortby" label="Sort By:" required  value={this.state.sortBy} onChange={this.handleSortByChange}>
                        <Option value='' label="None">None</Option>
                        {
                            options.map((sortOption) =>(
                                    <Option key={sortOption.name} value={sortOption.name} label={sortOption.name.toUpperCase()} />
                                )
                            )
                        }
                    </Select>
                </div>
                <ol className="categories-grid">
                    { (posts.length > 0) ?
                        renderContent(this.state.sortBy)
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
