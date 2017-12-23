import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Comments from './Comments';
import Button from 'muicss/lib/react/button';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import {post_a_comment} from '../utils/comments_utils';
import {postVote_by_id, delete_all_posts_comments_by_id} from '../utils/posts_utils';
import * as CommentActions  from '../actions/comments_actions';
import {increasePostCommentCount, postUpscore, postDownscore, deletePost} from '../actions/post_actions';
import PropTypes from 'prop-types';

const uuidV1 = require('uuid/v1');

class Post extends Component {

    componentDidMount() {
        this.props.dispatch(CommentActions.fetchCommentsByParentID({id: this.props.match.params.id})());
    }

    state = {
        author: '',
        body: '',
        id: '',
        timestamp: Date.now(),
        open: false,
        emptyBodyAuthor: true,
        parentId: this.props.match.params.id,
        openConfirm: false,
    };

    handleOpenConfirm = () => {
        this.setState({openConfirm: true});
    };

    handleCloseConfirm = () => {
        this.setState({openConfirm: false});
    };

    handleDeleteConfirm = (e) => {
        const {dispatch} = this.props;
        delete_all_posts_comments_by_id(this.props.match.params.id);
        dispatch(deletePost(this.props.posts.posts.filter(post => post.id === this.props.match.params.id)[0]))
        this.setState({openConfirm: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };


    handleClose = () => {
        this.setState({open: false});
    };

    handleAuthorChange = (e) => {
        this.setState({author: e.target.value},
            () => {
                this.handleBodyAuthor();
            });
    }

    handleNewCommentSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        this.setState({
            id: uuidV1()
        }, () => {
            post_a_comment(this.state).then((valueReturned) => {
                this.handleClose();
                dispatch(CommentActions.commentCreator(valueReturned));
                // Need to dispatch an action that increases this posts commentCount
                dispatch(increasePostCommentCount(valueReturned));
                this.setState({
                    author: '',
                    body: '',
                    id: ''
                })
            })
        })
    };

    handleDownVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "downVote";
        postVote_by_id(this.state.parentId, voteType)
            .then((valueReturned) => {
                dispatch(postDownscore(valueReturned));
            });
    };
    handleUpVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "upVote";
        postVote_by_id(this.state.parentId, voteType)
            .then((valueReturned) => {
                dispatch(postUpscore(valueReturned));
            });
    };
    handleBodyChange = (e) => {
        this.setState({body: e.target.value}, () => {
            this.handleBodyAuthor();
        });
    };
    handleBodyAuthor = () => {
        if (this.state.author === '' || this.state.body === '') {
            this.setState({emptyBodyAuthor: true});
        }
        if (this.state.author.length > 0 && this.state.body.length > 0) {
            this.setState({emptyBodyAuthor: false});
        }
    };

    render() {
        const pathname = this.props.location.pathname;
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
        const commentActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleNewCommentSubmit}
            />,
        ];

        const postID = this.props;
        const singlePost = this.props.posts.posts.find(post => post.id === postID.match.params.id);
        this.props.dispatch(CommentActions.fetchCommentsByParentID(this.props.match.params.id));

        return (
            <div className="posts">
                <div>Post</div>
                <MuiThemeProvider>
                    <ol className="categories-grid">
                        { singlePost ?
                            (singlePost.id && !singlePost.deleted) ?
                                <div key={singlePost.id}>
                                    <li>
                                        <div className="">
                                            <div className="">
                                            </div>
                                            <div className="">Title: <Link to={`${pathname}`}>{singlePost.title}</Link>
                                            </div>
                                            <div>Date: {new Date(singlePost.timestamp).toUTCString()}</div>
                                            <div>Content: {singlePost.body}</div>
                                            <div>By: {singlePost.author}</div>
                                            <div>Category: {singlePost.category}</div>
                                            <Link to={`${pathname}/edit`}>Edit</Link>
                                            <div>Vote Score: {singlePost.voteScore}
                                                <Button onClick={this.handleUpVote}>+</Button>
                                                <Button onClick={this.handleDownVote}>-</Button>
                                            </div>
                                            <div>
                                                <RaisedButton label="Delete" onClick={this.handleOpenConfirm}/>
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
                                            <br />
                                            <div>
                                                Comments: {singlePost.commentCount}
                                                <RaisedButton label="Add Comment" onClick={this.handleOpen}/>
                                                <Dialog
                                                    title="New Comment:"
                                                    actions={commentActions}
                                                    modal={true}
                                                    open={this.state.open}
                                                >
                                                    <Form>
                                                        <Input hint="Author" value={this.state.author} required={true}
                                                               onChange={this.handleAuthorChange}/>
                                                        <Textarea hint="Body" value={this.state.body} required={true}
                                                                  onChange={this.handleBodyChange}/>
                                                    </Form>
                                                </Dialog>

                                            </div>

                                            <Comments id={singlePost.id}/>
                                            <div className="">
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                : <div>No bueno</div>
                            :
                            (this.props.match.params.id && !singlePost )
                                ? <div>This Post has been deleted.</div>
                                : <CircularProgress size={80} thickness={5}/>
                        }
                    </ol>
                </MuiThemeProvider>
            </div>
        )
    }
}

Post.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = posts => posts;


export default connect(mapStateToProps)(Post);
