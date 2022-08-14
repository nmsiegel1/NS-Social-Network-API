const { Schema, model } = require("mongoose");

// user schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (next) {
    const thoughts = await this.model.find(this.getFilter());
    const users = thoughts.map((item) => item._id);
    await UserLink.deleteMany({ user: { $in: users } });
    next();
  }
);

// create friend count
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
