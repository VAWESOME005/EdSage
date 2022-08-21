import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    name: { type: String, trim: true, required: "Name is required" },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: { type: String, required: true, min: 6, max: 64 },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

teacherSchema.pre("save", function (next) {
  let teacher = this;
  if (teacher.isModified("password")) {
    return bcrypt.hash(teacher.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HAS ERR", err);
        return next(err);
      }

      teacher.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

teacherSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD");
      return next(err, false);
    }
    console.log("MATCH PASSWORD", match);
    return next(null, match);
  });
};

export default mongoose.model("Teacher", teacherSchema);
