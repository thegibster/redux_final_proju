import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Button from 'muicss/lib/react/button';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {postVote_by_id, delete_all_posts_comments_by_id} from '../utils/posts_utils';
import {postUpscore, postDownscore, deletePost} from '../actions/post_actions';
import PropTypes from 'prop-types';

class AllPosts extends Component {
    state = {
        sortBy: '',
        openConfirm: false,
        id_for_delete: ''
    };
    handleOpenConfirm = (post_id) => {
        this.setState({
            openConfirm: true,
            id_for_delete: post_id
        });
    };

    handleCloseConfirm = () => {
        this.setState({openConfirm: false});
    };
    handleDeleteConfirm = (e) => {
        const {dispatch} = this.props;
        const deletedId = this.state.id_for_delete;
        delete_all_posts_comments_by_id(deletedId);
        dispatch(deletePost(this.props.posts.posts.find(post => post.id === deletedId)));
        this.setState({openConfirm: false});
    };
    handleSortByChange = (e) => {
        console.log('state changed srt to', e.target.value)
        this.setState({sortBy: e.target.value});
    };
    handleDownVote = (post_id, e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "downVote";
        postVote_by_id(post_id, voteType)
            .then((valueReturned) => {
                dispatch(postDownscore(valueReturned));
            });
    };
    handleUpVote = (post_id, e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "upVote";
        postVote_by_id(post_id, voteType)
            .then((valueReturned) => {
                dispatch(postUpscore(valueReturned));
            });
    };
    curriedFilter = (filterToUse, posts) => {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseConfirm}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleDeleteConfirm}
            />,
        ];


        if (filterToUse !== '') {
            return (posts.sort((a, b) => a[filterToUse] - b[filterToUse]).map((post) => (
                <div key={post.id}>
                    <MuiThemeProvider>

                        <li>
                            <div className="">
                                <div className="">
                                </div>
                                <div className="">Title: <Link
                                    to={`${post.category}/${post.id}`}>{post.title}</Link></div>
                                <div>Content: {post.body}</div>
                                <div>By: {post.author}</div>
                                <div>Category: {post.category}</div>
                                <div>Vote Score: {post.voteScore}
                                    <Button onClick={(e) => this.handleUpVote(post.id, e)}>+</Button>
                                    <Button onClick={(e) => this.handleDownVote(post.id, e)}>-</Button>
                                </div>
                                <div>Comments: {post.commentCount}</div>
                                <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                <Link to={`${ "/posts/" + post.id}/edit`}>Edit</Link>

                                <div className="">
                                    <div>
                                        <RaisedButton label="Delete" onClick={() => this.handleOpenConfirm(post.id)}/>
                                        <Dialog
                                            title="Confirm Delete"
                                            actions={actions}
                                            modal={false}
                                            open={this.state.openConfirm}
                                            onRequestClose={this.handleCloseConfirm}
                                        >
                                            Warning: You are about to delete this Post.
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </MuiThemeProvider>
                </div>
            )))
        } else {
            return (
                posts.map((post) => (
                        <div key={post.id}>
                            <MuiThemeProvider>

                                <li>
                                    <div className="">
                                        <div className="">
                                        </div>
                                        <div className="">Title: <Link
                                            to={`${post.category}/${post.id}`}>{post.title}</Link></div>
                                        <div>Content: {post.body}</div>
                                        <div>By: {post.author}</div>
                                        <div>Category: {post.category}</div>
                                        <div>Vote Score: {post.voteScore}
                                            <Button onClick={(e) => this.handleUpVote(post.id, e)}>+</Button>
                                            <Button onClick={(e) => this.handleDownVote(post.id, e)}>-</Button>
                                        </div>
                                        <div>Comments: {post.commentCount}</div>
                                        <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                        <Link to={`${"/posts/" + post.id}/edit`}>Edit</Link>
                                        <div className="">
                                            <div>
                                                <RaisedButton label="Delete"
                                                              onClick={() => this.handleOpenConfirm(post.id)}/>
                                                <Dialog
                                                    title="Confirm Delete"
                                                    actions={actions}
                                                    modal={false}
                                                    open={this.state.openConfirm}
                                                    onRequestClose={this.handleCloseConfirm}
                                                >
                                                    Warning: You are about to delete this Post.
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </MuiThemeProvider>
                        </div>

                    )
                )
            )
        }
    };

    render() {
        const options = [{name: 'voteScore'}, {name: 'timestamp'}];
        const {posts} = this.props.posts;

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
                        this.curriedFilter(this.state.sortBy, posts)
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
