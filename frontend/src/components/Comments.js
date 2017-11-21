import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from './Comment';


class Comments extends Component {
    render () {
        const comments = this.props.comments.comments.filter((comment)=> comment.parentId === this.props.id);
        comments.sort
        console.log("nested comments const", comments)

        return (
            <div>
                {
                    (comments !== null && Object.keys(comments).length !== 0 ) ?
                        <h3>All Comments</h3>
                        :
                        <h3>No Comments</h3>
                }

                <ul>
                    {comments ? comments.sort((a,b) => b.voteScore-a.voteScore).map((comment) => (

                        <li key={comment.id}><Comment comment={comment} /></li>
                        )
                    ) : <div>No Comments Here</div>
                    }
                </ul>


            </div>

        )
    }
}

function mapStateToProps(comments) {
    return comments;
}

export default connect(mapStateToProps)(Comments);

// export default Home;
// {/*<li key={comment.id}>{`${comment.body} VoteScore ${comment.voteScore}`} </li>*/}
