import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
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
import {postVote_by_id,delete_all_posts_comments_by_id} from '../utils/posts_utils'
import {bindActionCreators} from 'redux';
import * as CommentActions  from '../actions/comments_actions';
import {increasePostCommentCount,postUpscore,postDownscore} from '../actions/post_actions';


const uuidV1 = require('uuid/v1');

//might need to either filter from the state of posts right here
//or actually execute the api call for a single post

const style = {
    margin: 12,
};

class Post extends Component {

    componentDidMount(){

        // this.props.dispatch({type:'GET_COMMENTS', comments:[{parentId:'8xf0y6ziyjabvozdd253nd',id:'cookies',body:'no freaking way'}]});
        this.props.dispatch(CommentActions.fetchCommentsByParentID({id:this.props.match.params.id})());
        console.log(this.props,"urika from Post");

    }

    state = {
        author:'',
        body:'',
        id: '',
        timestamp:Date.now(),
        open: false,
        emptyBodyAuthor:true,
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
        console.log('deleted gont',this.props.match.params.id);
        delete_all_posts_comments_by_id(this.props.match.params.id);
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
        console.log("the values on the new comment", e.target,this.state);
        this.setState({
            id: uuidV1()
        }, () => {
            post_a_comment(this.state).then((valueReturned)=> {
                this.handleClose();
                dispatch(CommentActions.commentCreator(valueReturned));
                // Need to dispatch an action that increases this posts commentCount
                dispatch(increasePostCommentCount(valueReturned));
                this.setState({
                    author: '',
                    body:'',
                    id:''
                })
            })
        })
    }


    handleDownVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "downVote";
        postVote_by_id(this.state.parentId,voteType)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(postDownscore(valueReturned));
            });
    }
    handleUpVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "upVote";
        postVote_by_id(this.state.parentId,voteType)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(postUpscore(valueReturned));
            });
    }
    handleBodyChange = (e) => {
        this.setState({body: e.target.value},() => {
            this.handleBodyAuthor();
        });
    }
    handleBodyAuthor = () => {
        if(this.state.author === '' || this.state.body === '') {
            this.setState({emptyBodyAuthor: true});
        }
        if(this.state.author.length > 0 && this.state.body.length > 0) {
            this.setState({emptyBodyAuthor: false});
        }
    }

    render () {

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
        // const actions = [
        //     <FlatButton
        //         label="Cancel"
        //         primary={true}
        //         onClick={this.handleClose}
        //     />,
        //     <FlatButton
        //         label="Submit"
        //         primary={true}
        //         disabled={this.state.emptyBodyAuthor}
        //         onClick={this.handleClose}
        //     />,
        // ];

        console.log("category posts jive turkey",this.props);
        // const { post } = this.props.post;
        const postID = this.props;
        console.log(this.props, postID.location.pathname);
        console.log(postID);
        const singlePost = this.props.posts.posts.filter(post => post.id === postID.match.params.id);
        this.props.dispatch(CommentActions.fetchCommentsByParentID(this.props.match.params.id));
        console.log(singlePost, 'barking')

        // return(<div>hi</div>)
        return (
            <div className="posts">
                <div>Post</div>
                <MuiThemeProvider>

                    <ol className="categories-grid">
                        {/*
                         If the array returned is loaded with an empty object then that must be checked
                         using the Object.keys method, as no keys indicates no values actually exist in
                         the object

                         */}
                        { (singlePost !== null && Object.keys(singlePost).length !== 0 ) ?

                            singlePost.map((post) => (
                                (post.id && !post.deleted) ?
                                    <div key={post.id}>
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
                                                <div className="category-title">Title: <Link to={`/${post.id}`}>{post.title}</Link></div>
                                                <div>Date: {new Date(post.timestamp).toUTCString()}</div>
                                                <div>{post.body}</div>
                                                <div>By: {post.author}</div>
                                                <div>Category: {post.category}</div>
                                                <div>Vote Score: {post.voteScore}
                                                    <Button onClick={this.handleUpVote}>+</Button>
                                                    <Button onClick={this.handleDownVote}>-</Button>
                                                </div>
                                                <div>
                                                    <RaisedButton label="Delete" onClick={this.handleOpenConfirm} />
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
                                                    Comments: {post.commentCount}
                                                    <RaisedButton label="Add Comment" onClick={this.handleOpen} />
                                                    <Dialog
                                                        title="New Comment:"
                                                        actions={actions}
                                                        modal={true}
                                                        open={this.state.open}
                                                    >
                                                        <Form onSubmit={this.handleNewCommentSubmit}>
                                                            <Input hint="Author" value={this.state.author} required={true} onChange={this.handleAuthorChange}/>
                                                            <Textarea hint="Body" value={this.state.body}  required={true} onChange={this.handleBodyChange}/>
                                                            <Button variant="raised">Submit</Button>
                                                        </Form>
                                                    </Dialog>

                                                </div>

                                                <Comments id={post.id}/>
                                                <div className="category-path">
                                                    {/*<Link to={`/${category.path}`}>{category.path}</Link>*/}
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    : <div>No bueno</div>
                            ))

                            // : <div>{`No Post matching the id: ${postID.match.params.id} was found.`}</div>
                            :
                            (this.props.match.params.id && singlePost.length === 0 )
                                ? <div>This Post has been deleted.</div>
                                : <CircularProgress size={80} thickness={5} />

                        }

                    </ol>
                </MuiThemeProvider>
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return posts;
}

// function mapDispatchToProps(dispatch){
//     return {
//         actions: bindActionCreators(CommentActions,dispatch)
//     };
// }

export default connect(mapStateToProps)(Post);
// export default  Post;

// export default Categories;
