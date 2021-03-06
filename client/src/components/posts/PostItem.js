import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost, unlikePost, deletePost } from '../../actions/post';

const postIsLiked = (userId, postLikes) =>
	postLikes.filter((x) => x.user === userId).length > 0;

const PostItem = ({
	likePost,
	unlikePost,
	deletePost,
	auth,
	post: { _id, title, text, name, avatar, user, likes, comments, date },
	showActions
}) => {
	const counter =
		likes.length > 0 ? <span>{likes.length}</span> : <span></span>;

	return (
		<div className='post bg-white'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<h4 className='text-primary'>{title}</h4>
				<p>{text}</p>
				<p className='post-date'>
					Posted on:<Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>

				{showActions && (
					<Fragment>
						{!auth.loading && !postIsLiked(auth.user._id, likes) && (
							<button
								onClick={() => likePost(_id)}
								type='button'
								className='btn btn-light'
							>
								<i className='fas fa-thumbs-up' /> {counter}
							</button>
						)}
						{!auth.loading && postIsLiked(auth.user._id, likes) && (
							<button
								onClick={() => unlikePost(_id)}
								type='button'
								className='btn btn-light'
							>
								<i className='fas fa-thumbs-up green' /> {counter}
							</button>
						)}
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Discussion{' '}
							{comments.length > 0 && (
								<span className='comment-count'>{comments.length}</span>
							)}
						</Link>
						{!auth.loading && user === auth.user._id && (
							<button
								onClick={() => deletePost(_id)}
								type='button'
								className='btn btn-danger'
							>
								<i className='fas fa-times' />
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
	PostItem
);
