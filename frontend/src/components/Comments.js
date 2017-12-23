import React, {Component} from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

class Comments extends Component {
    state = {
        expanded: false,
    };

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };

    render() {
        const comments = this.props.comments.comments.filter((comment) => comment.parentId === this.props.id);
        comments.sort;

        return (
            <div>
                {
                    (comments !== null && Object.keys(comments).length !== 0 ) ?
                        <h3>All Comments</h3>
                        :
                        <h3>No Comments</h3>
                }

                <ul>
                    <MuiThemeProvider>


                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

                            <CardText>
                                <Toggle
                                    toggled={this.state.expanded}
                                    onToggle={this.handleToggle}
                                    labelPosition="right"
                                    label="Expand All Comments"
                                />
                            </CardText>


                            <CardText expandable={true}>
                                {comments ? comments.sort((a, b) => b.voteScore - a.voteScore).map((comment) => (

                                        !comment.deleted ? <li key={comment.id}><Comment comment={comment}/></li> :
                                            <div></div>
                                    )
                                ) : <div>No Comments Here</div>
                                }
                            </CardText>
                            <CardActions>
                                <FlatButton label="Expand" onClick={this.handleExpand}/>
                                <FlatButton label="Reduce" onClick={this.handleReduce}/>
                            </CardActions>
                        </Card>
                    </MuiThemeProvider>
                </ul>


            </div>

        )
    }
}

const mapStateToProps = comments => comments;

export default connect(mapStateToProps)(Comments);