import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import Alert from '../layout/Alert';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<div className='bg'>
			<div className='dark-overlay'>
				<div className='container'>
					<Alert />
					<Spinner />
				</div>
			</div>
		</div>
	) : (
		<div className='bg'>
			<div className='dark-overlay'>
				<div className='container'>
					<Alert />
					<h1 className='large text-primary'>Posts</h1>
					<p className='lead'>
						<i className='fas fa-user' /> Welcome to the community
					</p>
					<PostForm />
					<div className='posts'>
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
