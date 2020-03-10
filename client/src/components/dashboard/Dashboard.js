import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/auth';
import Alert from '../layout/Alert';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<div className='bg'>
			<div className='dark-overlay'>
				<div className='container'>
					<Alert />
					<h1 className='text-primary'>Dashboard</h1>
					<p>
						<i className='fas fa-user' /> Welcome {user && user.name}
					</p>
					{profile !== null ? (
						<Fragment>
							<DashboardActions />
							<Experience experience={profile.experience} />
							<Education education={profile.education} />
							<button
								className='btn btn-danger tm'
								onClick={() => deleteAccount()}
							>
								<i className='fas fa-user-minus' /> Delete My Account
							</button>
						</Fragment>
					) : (
						<Fragment>
							<p className='m'>You have not yet setup your profile.</p>
							<Link to='/create-profile' className='btn btn-primary'>
								Create Profile
							</Link>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
