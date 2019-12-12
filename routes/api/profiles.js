const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Private GET api/profiles/me
// Get current users profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      // Status Code 400: Bad Request
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Private POST api/profiles
// Create or update user profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills are required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send("Server error");
    }
  }
);

// Public GET api/profiles
// Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Public GET api/profiles/user/:user_id
// Get profile by ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    // Status Code 400: Bad Request
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      // Status Code 400: Bad Request
      return res.status(400).json({ msg: "Profile not found" });
    }

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Private DELETE api/profiles
// Delete profile, user, and posts
router.get("/", auth, async (req, res) => {
  try {
    // (should also remove users posts in the future)

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "Account deleted" });
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Private PUT api/profiles/experience
// Add a work experience item to profile
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send("Server error");
    }
  }
);

// Private DELETE api/profiles/experience/:exp_id
// Delete an work experience item from profile
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Private PUT api/profiles/education
// Add an education item to profile
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Status Code 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);

      // Status Code 500: Internal Server Error
      res.status(500).send("Server error");
    }
  }
);

// Private DELETE api/profiles/education/:edu_id
// Delete an education item from profile
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    res.status(500).send("Server error");
  }
});

// Public GET api/profiles/github/:username
// Get repos from Github
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error.message);

      if (response.statusCode !== 200) {
        // Status Code 404: Not Found
        return res.status(404).json({ msg: "No starred repos found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);

    // Status Code 500: Internal Server Error
    return res.status(500).send("Server error");
  }
});

module.exports = router;
