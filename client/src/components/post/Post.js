import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
		// eslint-disable-next-line
	}, [getPost]);

	return loading || post === null ? (
		<div className='bg'>
			<div className='dark-overlay'>
				<div className='container'>
					<Spinner />
				</div>
			</div>
		</div>
	) : (
		<div className='bg'>
			<div className='dark-overlay'>
				<div className='container'>
					<Link to='/posts' className='btn'>
						Back To Posts
					</Link>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<div className='p'>
						{post.comments.map((comment) => (
							<CommentItem
								key={comment._id}
								comment={comment}
								postId={post._id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
