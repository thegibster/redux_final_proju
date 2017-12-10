import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Loader from 'react-loader';
import Container from 'muicss/lib/react/container';
import {edit_comment_by_id} from '../utils/comments_utils';
import {fetchCommentByID,editedCommenttLoad} from '../actions/comments_actions';



class EditComment extends Component {

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
    getThisComment = () => this.props.comments.comments.filter(comment => comment.id === this.props.match.params.id);
    editDone() {
        this.props.history.push('/posts');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const finalObEdit = {};
        Object.keys(this.state).forEach((key) => {
            if(this.state[key].length > 0){
                console.log(this.state[key])
                finalObEdit[key] = this.state[key];
            }
        });
        console.log(this.props.match.params.id)
        edit_comment_by_id(this.props.match.params.id,finalObEdit)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(editedCommenttLoad(valueReturned));
                this.setState({
                    body:'',
                    author:''
                });
                this.editDone();
            });

        console.log('submit edit',finalObEdit);
    }



    render () {
        // const postID = this.props;
        // const singleComment = this.props.comments.comments.filter(comment => comment.id === postID.match.params.id);
        const singleComment = this.getThisComment();
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

export default connect(mapStateToProps)(EditComment);
