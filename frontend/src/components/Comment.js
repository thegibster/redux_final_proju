import React, { Component } from 'react';
// import { Link  } from 'react-router-dom';
// import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class Comment extends Component {
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
                                            Vote Score: {comment.voteScore} <Button>-</Button><Button>+</Button>
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
