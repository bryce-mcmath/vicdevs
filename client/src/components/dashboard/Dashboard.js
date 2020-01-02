import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="bg">
      <div className="dark-overlay">
        <div className="container">
          <h1 className="text-primary">Dashboard</h1>
          <p>
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <Fragment>has</Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup your profile.</p>
              <Link to="/create-profile" className="btn btn-primary">
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

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
