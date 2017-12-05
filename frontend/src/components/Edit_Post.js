import React, { Component } from 'react';
// import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Loader from 'react-loader';

class Edit_Post extends Component {
    render () {
        console.log("edit-post" ,this.props)
        const postID = this.props;
        const singlePost = this.props.posts.posts.filter(post => post.id === postID.match.params.id);
        console.log(singlePost[0])
        // const getEditPost = (item) => item.id === postID.match.params.id;
        // console.log(singlePost.find(getEditPost));
        return (
            <Container>
                <h1>Edit Post</h1>



                { (singlePost !== null && Object.keys(singlePost).length !== 0 ) ?

                    singlePost.map((post) => (
                        post.id ?
                            <div key={post.id}>
                                <Form>
                                    <Input hint="Title" value={post.title}/>
                                    <Input hint="Author" value={post.author}/>
                                    <Input hint="Category" value={post.category}/>
                                    <Textarea hint="Body" value={post.body}/>
                                    <Button variant="raised">Submit</Button>
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
