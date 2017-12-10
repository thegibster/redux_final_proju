import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
// import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {post_vote_comments_by_id,delete_comment_by_id} from '../utils/comments_utils';



class Comment extends Component {

    state = {

        openConfirm: false,
    };

    // editComment = (e) => {
    //     e.preventDefault();
    //     this.props.history.push(`/comments/${this.props.comment.id}/edit`);
    // }
    handleDownVote = (e) => {
        e.preventDefault();
        const voteType = "downVote";
        post_vote_comments_by_id(this.props.comment.id,voteType)
    }
    handleUpVote = (e) => {
        e.preventDefault();
        const voteType = "upVote";
        post_vote_comments_by_id(this.props.comment.id,voteType)
    }


    handleOpenConfirm = () => {
        this.setState({openConfirm: true});
    };

    handleCloseConfirm = () => {
        this.setState({openConfirm: false});
    };

    handleDeleteConfirm = (e) => {
        console.log('deleted gont',this.props.comment.id);
        delete_comment_by_id(this.props.comment.id)
        this.setState({openConfirm: false});

    };



    render () {
        const comment = this.props.comment;
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

        console.log("single comment const", comment)

        return (
            <div>

                <MuiThemeProvider>

                    {comment ?
                            <div>

                                    <Card>
                                        <CardHeader
                                            title={`By: ${comment.author}`}
                                            subtitle={`created: ${new Date(comment.timestamp).toUTCString()}`}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />

                                        <CardText expandable={true}>
                                            {comment.body}<br />
                                            Vote Score: {comment.voteScore}<br />
                                            ParentDeleted: {!comment.parentDeleted ? 'False':'True'}<br />
                                            Deleted: {!comment.deleted ? 'False':'True'}<br />
                                            <Button onClick={this.handleUpVote}>+</Button>
                                            <Button onClick={this.handleDownVote}>-</Button><br />
                                            <Button><Link to={`/comments/${this.props.comment.id}/edit`}>Edit Comment</Link></Button>

                                        </CardText>
                                    </Card>
                                    <br />
                                    <div>
                                        <RaisedButton label="Delete" onClick={this.handleOpenConfirm} />
                                        <Dialog
                                            title="Confirm Delete"
                                            actions={actions}
                                            modal={false}
                                            open={this.state.openConfirm}
                                            onRequestClose={this.handleCloseConfirm}
                                        >
                                            Warning: You are about to delete this Comment.
                                        </Dialog>
                                    </div>



                            </div>

                     : <div>No Comment Here</div>
                    }
                </MuiThemeProvider>

            </div>

        )
    }
}





export default Comment;
