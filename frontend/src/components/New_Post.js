import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

class New_Post extends Component {

    render () {

    const options = this.props.categories.categories;
        console.log("new-post", options);
        return (


        <Container>
            <h1>Create A New Post</h1>
            <Form>
                <Input hint="Title" />
                <Input hint="Author" />
                <Select name="input" label="Choose A Category" required>
                    <Option value="" label="None">None</Option>
                    {
                        options.map((category) =>(
                            <Option key={category.name} value={category.name} label={category.name.toUpperCase()} />
                            )
                        )
                    }
                </Select>
                <Textarea hint="Body" />
                <Button variant="raised">Submit</Button>
            </Form>
        </Container>
        )
    }
}
function mapStateToProps(categories) {
    return categories;
}

export default connect(mapStateToProps)(New_Post);

// export default New_Post;
