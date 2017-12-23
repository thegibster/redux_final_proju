import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import {postNewPost} from   '../actions/post_actions';
import {postLoad} from '../actions/post_actions';
import PropTypes from 'prop-types';

class New_Post extends Component {
    state = {

        author: '',
        body: '',
        category: '',
        title: ''

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

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        postNewPost(this.state)
            .then((valueReturned) => {
                console.log((valueReturned))
                dispatch(postLoad(valueReturned));
                this.setState({
                    title: '',
                    category: '',
                    body: '',
                    author: ''
                });
                this.props.history.push('/posts');
            });

    };

    render() {

        const options = this.props.categories.categories;

        return (

            <Container>
                <h1>Create A New Post</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Input hint="Title" value={this.state.title} onChange={this.handleTitleChange}/>
                    <Input hint="Author" value={this.state.author} onChange={this.handleAuthorChange}/>
                    <Select name="input" label="Choose A Category" required value={this.state.category}
                            onChange={this.handleCategoryChange}>
                        <Option value="" label="None">None</Option>
                        {
                            options.map((category) => (
                                    <Option key={category.name} value={category.name} label={category.name.toUpperCase()}/>
                                )
                            )
                        }
                    </Select>
                    <Textarea hint="Body" value={this.state.body} onChange={this.handleBodyChange}/>
                    <Button variant="raised" type="submit" value="Submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}

New_Post.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

const mapStateToProps = posts => posts;

export default connect(mapStateToProps)(New_Post);