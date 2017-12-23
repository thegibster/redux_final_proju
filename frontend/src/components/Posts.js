import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Button from 'muicss/lib/react/button';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {postVote_by_id,delete_all_posts_comments_by_id} from '../utils/posts_utils';
import {postUpscore,postDownscore,deletePost} from '../actions/post_actions';

class Posts extends Component {
    state = {
        sortBy: '',
        openConfirm: false,
        id_for_delete: ''
    }

    handleOpenConfirm = (post_id) => {
        console.log("post id should print", post_id)
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
        console.log('deleted gont', deletedId);
        delete_all_posts_comments_by_id(deletedId);
        dispatch(deletePost(this.props.posts.posts.find(post => post.id === deletedId)));
        this.setState({openConfirm: false});
    };
    handleSortByChange = (e) => {
        console.log('state changed srt to', e.target.value)
        this.setState({sortBy: e.target.value});
    }
    handleDownVote = (post_id,e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "downVote";
        postVote_by_id(post_id,voteType)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(postDownscore(valueReturned));
            });
    };
    handleUpVote = (post_id,e) => {
        e.preventDefault();
        console.log(post_id,'id getit passed');
        const {dispatch} = this.props;
        const voteType = "upVote";
        postVote_by_id(post_id,voteType)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(postUpscore(valueReturned));
            });
    };

    curriedFilter = (filterToUse, posts, pathname) => {
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
        let filter = filterToUse.toString();
        if (filterToUse !== '') {
            console.log(filterToUse !== '')
            console.log(filterToUse, 'thie filter seecltin wors', posts.sort((a, b) => a[filter] - b[filter]))
            console.log(pathname, 'if part')
            return (posts.sort((a, b) => a.filterToUse - b.filterToUse).map((post) => (
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
                                    <Button onClick={(e) => this.handleUpVote(post.id,e)}>+</Button>
                                    <Button onClick={(e) => this.handleDownVote(post.id,e)}>-</Button>
                                </div>
                                <div>Comments: {post.commentCount}</div>
                                <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                <Link to={`${pathname + "/" + post.id}/edit`}>Edit</Link>

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
            console.log(pathname, 'else part')
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
                                            <Button onClick={(e) => this.handleUpVote(post.id,e)}>+</Button>
                                            <Button onClick={(e) => this.handleDownVote(post.id,e)}>-</Button>
                                        </div>
                                        <div>Comments: {post.commentCount}</div>
                                        <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                        <Link to={`${pathname + "/" + post.id}/edit`}>Edit</Link>
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

const mapStateToProps = posts => posts;

export default connect(mapStateToProps)(Posts);