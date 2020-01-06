import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { bio, skills } }) => (
  <div className="profile-about bg-light p">
    {bio && (
      <Fragment>
        <h2 className="text-primary">Bio</h2>
        <p>{bio}</p>
        <div className="line" />
      </Fragment>
    )}
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills p">
      {skills.map((skill, index) => (
        <div key={index} className="xp">
          <i className="fas fa-check" />
          {" " + skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
