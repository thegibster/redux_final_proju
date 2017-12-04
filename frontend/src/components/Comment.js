import React, { Component } from 'react';
// import { Link  } from 'react-router-dom';
// import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {post_vote_comments_by_id} from '../utils/comments_utils';



class Comment extends Component {

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

    render () {
        const comment = this.props.comment;

        console.log("single comment const", comment)

        return (
            <div>



                    {comment ?
                            <div>
                                <MuiThemeProvider>
                                    <Card>
                                        <CardHeader
                                            title={`By: ${comment.author}`}
                                            subtitle={`created: ${new Date(comment.timestamp).toUTCString()}`}
                                            actAsExpander={true}
                                            showExpandableButton={true}
                                        />

                                        <CardText expandable={true}>
                                            {comment.body}<br />
                                            Vote Score: {comment.voteScore}
                                            <Button onClick={this.handleUpVote}>+</Button>
                                            <Button onClick={this.handleDownVote}>-</Button>
                                        </CardText>
                                    </Card>
                                </MuiThemeProvider>
                            </div>

                     : <div>No Comment Here</div>
                    }


            </div>

        )
    }
}





export default Comment;
