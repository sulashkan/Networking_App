const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, profession, skills, bio } = req.body;

    if (!name || !email || !password || !profession) {
      return res
        .status(400)
        .json({ error: "name, email, password, profession and skills required" });
    }

    const userExits = await userModel.findOne({ email });
    if (userExits) {
      return res.status(409).json({ error: "email already exits" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hash,
      profession,
      skills: skills || [],
      bio,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("signup err", err);
    return res.status(500).json({ error: "Server err" });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credential" });

    const hash = await bcrypt.compare(password, user.password);
    if (!hash) return res.status(401).json({ error: "Invalid credential" });

    const token = jwt.sign({ useId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token" , token , {
      httpOnly : true,
      secure: false,
      sameSite : 'lax',
      maxAge : 30000000
    })

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("login err", err);
    return res.status(500).json({ errors: "server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "" , {
      httpOnly: true,
      secure : false,  
      sameSite : 'lax',
      expires : new Date(0)
    });
   return res.status(201).json({message : "logout succesfully"} );
  } catch (err) {
    return res.status(500).json({err : "logout error"})
  }
};
