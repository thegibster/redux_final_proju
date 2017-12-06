import React, { Component } from 'react';
// import { Link  } from 'react-router-dom';
// import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Loader from 'react-loader';
import Container from 'muicss/lib/react/container';
import {edit_comment_by_id} from '../utils/comments_utils';
import {fetchCommentByID} from '../actions/comments_actions';



class Edit_Comment extends Component {

    componentDidMount(){
        this.props.dispatch(fetchCommentByID({id:this.props.match.params.id})());
    }

    state = {
        author:'',
        body:'',

    };

    handleAuthorChange = (e) => {
        this.setState({author: e.target.value});
    }
    handleBodyChange = (e) => {
        this.setState({body: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const finalObEdit = {};
        const sendChanges = Object.keys(this.state).forEach((key) => {
            if(this.state[key].length > 0){
                console.log(this.state[key])
                finalObEdit[key] = this.state[key];
            }
        });
        console.log(this.props.match.params.id)
        edit_comment_by_id(this.props.match.params.id,finalObEdit)

        console.log('submit edit',finalObEdit);
    }



    render () {
        const postID = this.props;
        const singleComment = this.props.comments.comments.filter(comment => comment.id === postID.match.params.id);

        console.log("single comment const",singleComment,this.props)

        return (
            <Container>
                <h1>Edit Comment</h1>



                { (singleComment !== null && Object.keys(singleComment).length !== 0 ) ?

                    singleComment.map((comment) => (
                        comment.id ?
                            <div key={comment.id}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Input name= "author" hint="Author" value={this.state.author || comment.author} onChange={this.handleAuthorChange}/>

                                    <Textarea name="body" hint="Body" value={this.state.body || comment.body} onChange={this.handleBodyChange}/>
                                    <Button variant="raised" type="submit" value="Submit">Submit</Button>
                                </Form>
                            </div>
                            : <div>No bueno</div>
                    ))

                    : <div><Loader/></div>
                }

            </Container>

        )
    }
}



function mapStateToProps(comments) {
    return comments;
}

export default connect(mapStateToProps)(Edit_Comment);