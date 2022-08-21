import User from "../models/user";
import Teacher from "../models/teacher"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6 || password.length > 64)
      return res
        .status(400)
        .send(
          "Password is required and should be between 6 - 64 characters long"
        ); 
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    //register
    const user = new User(req.body);
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try Again. ");
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();
    // console.log('USer exists')
    if (!user) return res.status(400).send("No account with that email");

    user.comparePassword(password, (err, match) => {
      // console.log('COMPARE PASSWORD IN LOGIN ERR', err);
      if (!match || err) return res.status(400).send("Wrong password");

      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Sign in failed");
  }
};


export const registerTeacher = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6 || password.length > 64)
      return res
        .status(400)
        .send(
          "Password is required and should be between 6 - 64 characters long"
        ); 
    let teacherExist = await Teacher.findOne({ email }).exec();
    if (teacherExist) return res.status(400).send("Email is taken");

    //register
    const teacher = new Teacher(req.body);
    await teacher.save();
    console.log("TEACHER CREATED", teacher);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE TEACHER FAILED", err);
    return res.status(400).send("Error. Try Again. ");
  }
};

export const loginTeacher = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    let teacher = await Teacher.findOne({ email }).exec();
    // console.log('USer exists')
    if (!teacher) return res.status(400).send("No account with that email");

    teacher.comparePassword(password, (err, match) => {
      // console.log('COMPARE PASSWORD IN LOGIN ERR', err);
      if (!match || err) return res.status(400).send("Wrong password");

      let token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        token,
        teacher: {
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Sign in failed");
  }
};

