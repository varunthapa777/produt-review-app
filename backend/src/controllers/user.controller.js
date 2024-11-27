import { validationResult } from "express-validator";
import userService from "../services/user.service.js";

const registrUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullName, username, email, password } = req.body;

    const { user, token } = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      username,
      email,
      password,
    });

    res.status(201).json({ user, token });
  } catch (err) {
    if (err.message === "Email already exists") {
      return res.status(409).json({ error: "Email already exists" });
    }
    if (err.message === "Username already exists") {
      return res.status(409).json({ error: "Username already exists" });
    }
    return res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.findUser(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    if (err.message === "Invalid email or password") {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    return res.status(500).json({ error: err.message });
  }
};

export default { registrUser, loginUser };
