import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {post_vote_comments_by_id,delete_comment_by_id} from '../utils/comments_utils';
import {commentVoteUp,commentVoteDown,deleteTheComment} from '../actions/comments_actions';
import {decreasePostCommentCount} from '../actions/post_actions';
import PropTypes from 'prop-types';

class Comment extends Component {

    state = {

        openConfirm: false,
    };

    handleDownVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "downVote";
        post_vote_comments_by_id(this.props.comment.id,voteType)
            .then( (valueReturned) => {
                console.log(valueReturned,'fialing ? handvote blah down');
                dispatch(commentVoteDown(valueReturned));

            });
    }
    handleUpVote = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const voteType = "upVote";
        post_vote_comments_by_id(this.props.comment.id,voteType)
            .then( (valueReturned) => {
                console.log(valueReturned,'fialing ? handvote blah up');
                dispatch(commentVoteUp(valueReturned));
            });
    }


    handleOpenConfirm = () => {
        this.setState({openConfirm: true});
    };

    handleCloseConfirm = () => {
        this.setState({openConfirm: false});
    };

    handleDeleteConfirm = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        console.log('deleted gont',this.props.comment.id);
        delete_comment_by_id(this.props.comment.id)
            .then((returnValue) => {
                dispatch(deleteTheComment(returnValue));
                dispatch(decreasePostCommentCount(this.props.comment));
            })
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

        console.log("single comment const", comment,this.props)

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

                                        </CardText>
                                    </Card>
                                    <br />
                            </div>

                     : <div>No Comment Here</div>
                    }
                </MuiThemeProvider>
            </div>
        )
    }
}

Comment.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};


const mapStateToProps = comments =>  comments ;

export default connect(mapStateToProps)(Comment);
