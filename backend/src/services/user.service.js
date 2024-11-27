import UserModel from "../models/user.model.js";

const createUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  if (!firstName || !username || !email || !password) {
    throw new Error("All fields are required");
  }
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already exists");
    }
    if (existingUser.username === username) {
      throw new Error("Username already exists");
    }
  }

  try {
    const hashedPassword = await UserModel.hashPassword(password);
    const user = await UserModel.create({
      fullName: { firstName, lastName },
      username,
      email,
      password: hashedPassword,
    });
    const token = user.generateToken();
    return { user, token };
  } catch (err) {
    throw err;
  }
};

const findUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  user.password = undefined;
  const token = user.generateToken();

  return { user, token };
};

export default { createUser, findUser };
