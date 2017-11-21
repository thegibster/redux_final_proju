import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';


class Comments extends Component {
    render () {
        const comments = this.props.comments.comments.filter((comment)=> comment.parentId === this.props.id);
        comments.sort
        console.log("nested comments const", comments)

        return (
            <div>

                <h3>All Comments</h3>
                <ul>
                    {comments ? comments.sort((a,b) => b.voteScore-a.voteScore).map((comment) => (
                            <li key={comment.id}>{`${comment.body} VoteScore ${comment.voteScore}`}</li>
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
