import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
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

//might need to either filter from the state of posts right here
//or actually execute the api call for a single post

class Post extends Component {

    state = {
        author:'',
        body:'',
        open: false,
        emptyBodyAuthor:true,
        parentId: this.props.match.params.id,
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
        console.log("the values on the new comment", e.target,this.state);
        post_a_comment(this.state).then(()=>
            this.handleClose()
        )

    }
    handleBodyChange = (e) => {
        this.setState({body: e.target.value},() => {
            this.handleBodyAuthor();
        });
    }
    handleBodyAuthor = () => {
        if(this.state.author == '' || this.state.body == '') {
            this.setState({emptyBodyAuthor: true});
        }
        if(this.state.author.length > 0 && this.state.body.length > 0) {
            this.setState({emptyBodyAuthor: false});
        }
    }

    render () {

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

        console.log("category posts");
        // const { post } = this.props.post;
        const postID = this.props;
        console.log(this.props, postID.location.pathname);
        console.log(postID);
        const singlePost = this.props.posts.posts.filter(post => post.id === postID.match.params.id);
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
                            post.id ?
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
                                        <div>Vote Score: {post.voteScore} <Button>+</Button><Button>-</Button></div>


                                            <div>
                                                Comments: {post.commentCount}
                                                <RaisedButton label="Add Comment" onClick={this.handleOpen} />
                                                <Dialog
                                                    title="New Comment:"
                                                    // actions={actions}
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
                            <CircularProgress size={80} thickness={5} />

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

export default connect(mapStateToProps)(Post);
// export default  Post;

// export default Categories;
