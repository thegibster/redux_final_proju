import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Option from 'muicss/lib/react/option';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Select from 'muicss/lib/react/select';
import Container from 'muicss/lib/react/container';
import Loader from 'react-loader';
import {edit_post_by_id} from '../utils/posts_utils';
import {editedPostLoad} from '../actions/post_actions';
import PropTypes from 'prop-types';

class EditPost extends Component {

    state = {

        author:'',
        body:'',
        category:'',
        title:''

    };

    handleAuthorChange = (e) => {
        this.setState({author: e.target.value});
    };
    handleBodyChange = (e) => {
        this.setState({body: e.target.value});
    };
    handleCategoryChange = (e) => {
        this.setState({category: e.target.value});
    };
    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    };
    editDone() {
        this.props.history.push('/posts');
    };
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
        edit_post_by_id(this.props.match.params.id,finalObEdit)
            .then( (valueReturned) => {
                console.log((valueReturned))
                dispatch(editedPostLoad(valueReturned));
                this.setState({
                    title: '',
                    category: '',
                    body:'',
                    author:''
                });
                this.editDone();
            });
    };


    render () {
        const options = this.props.categories.categories;
        const postID = this.props;
        const singlePost = this.props.posts.posts.find(post => post.id === postID.match.params.id);
        return (
            <Container>
                <h1>Edit Post</h1>

                { (singlePost !== undefined) ?
                    singlePost.id ?
                        <div key={singlePost.id}>
                            <Form onSubmit={this.handleSubmit}>
                                <Input name="title" hint="Title" value={this.state.title || singlePost.title} onChange={this.handleTitleChange}/>
                                <Input name= "author" hint="Author" value={this.state.author || singlePost.author} onChange={this.handleAuthorChange}/>
                                <Select name="category" label="Choose A Category" required  value={this.state.category || singlePost.category} onChange={this.handleCategoryChange}>
                                    <Option value='' label="None">None</Option>
                                    {
                                        options.map((category) =>(
                                                <Option key={category.name} value={category.name} label={category.name.toUpperCase()} />
                                            )
                                        )
                                    }
                                </Select>
                                <Textarea name="body" hint="Body" value={this.state.body || singlePost.body} onChange={this.handleBodyChange}/>
                                <Button variant="raised" type="submit" value="Submit">Submit</Button>
                            </Form>
                        </div>
                        : <div>No bueno</div>

                    : <div><Loader/></div>
                }

            </Container>
        )
    }
}

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(EditPost);