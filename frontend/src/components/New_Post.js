import React, { Component } from 'react';
import { Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import {post_a_post} from '../utils/posts_utils';
import { postNewPost } from   '../actions/post_actions';


class New_Post extends Component {
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

    handleSubmit = (e) => {
        e.preventDefault();

        console.log("the values on submit action", e.target,this.state);
        // post_a_post(this.state);
        postNewPost(this.state)
            .then( () => {
                alert("Success, post posted");
                this.setState({
                    title: '',
                    category: '',
                    body:'',
                    author:''
                });
                <Redirect to={{
                    pathname: '/'
                }}/>
            });

    }

    render () {

    const options = this.props.categories.categories;
        // console.log("new-post", options);
        return (


        <Container>
            <h1>Create A New Post</h1>
            <Form onSubmit={this.handleSubmit}>
                <Input hint="Title"  value={this.state.title} onChange={this.handleTitleChange}/>
                <Input hint="Author"  value={this.state.author} onChange={this.handleAuthorChange}/>
                <Select name="input" label="Choose A Category" required  value={this.state.category} onChange={this.handleCategoryChange}>
                    <Option value="" label="None">None</Option>
                    {
                        options.map((category) =>(
                            <Option key={category.name} value={category.name} label={category.name.toUpperCase()} />
                            )
                        )
                    }
                </Select>
                <Textarea hint="Body" value={this.state.body} onChange={this.handleBodyChange} />
                <Button variant="raised" type="submit" value="Submit">Submit</Button>
            </Form>
        </Container>
        )
    }
}
function mapStateToProps(posts) {
    return posts;
}

export default connect(mapStateToProps)(New_Post);

// export default New_Post;
