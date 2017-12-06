import React, { Component } from 'react';
import { Route, Link, Redirect  } from 'react-router-dom';
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

class Edit_Post extends Component {

    state = {

        author:'',
        body:'',
        category:'',
        title:''

    }

    handleAuthorChange = (e) => {
        this.setState({author: e.target.value});
    }
    handleBodyChange = (e) => {
        this.setState({body: e.target.value});
    }
    handleCategoryChange = (e) => {
        this.setState({category: e.target.value});
    }
    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }
    editDone() {
        this.props.history.push('/');
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
        edit_post_by_id(this.props.match.params.id,finalObEdit)
        this.editDone()
        console.log('submit edit',finalObEdit);
    }


    render () {
        const options = this.props.categories.categories;

        console.log("edit-post hallue" ,this.props)
        const postID = this.props;
        const singlePost = this.props.posts.posts.filter(post => post.id === postID.match.params.id);

        console.log(singlePost[0],singlePost)
        // const getEditPost = (item) => item.id === postID.match.params.id;
        // console.log(singlePost.find(getEditPost));
        return (
            <Container>
                <h1>Edit Post</h1>



                { (singlePost !== null && Object.keys(singlePost).length !== 0 ) ?

                    singlePost.map((post) => (
                        post.id ?
                            <div key={post.id}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Input name="title" hint="Title" value={this.state.title || post.title} onChange={this.handleTitleChange}/>
                                    <Input name= "author" hint="Author" value={this.state.author || post.author} onChange={this.handleAuthorChange}/>
                                    <Select name="category" label="Choose A Category" required  value={this.state.category || post.category} onChange={this.handleCategoryChange}>
                                        <Option value='' label="None">None</Option>
                                        {
                                            options.map((category) =>(
                                                    <Option key={category.name} value={category.name} label={category.name.toUpperCase()} />
                                                )
                                            )
                                        }
                                    </Select>
                                    <Textarea name="body" hint="Body" value={this.state.body || post.body} onChange={this.handleBodyChange}/>
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

function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(Edit_Post);

// export default Edit_Post;
