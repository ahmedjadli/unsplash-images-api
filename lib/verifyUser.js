import axios from "axios";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default async function verifyUser(req, res) {
  const token = getCookie("token", { req, res });

  if (!token) {
    return null;
  }

  const decoded = await jwt.decode(token, process.env.JW_SECRET);

  const user = await axios
    .post(`http://localhost:3000/api/users/${decoded.user.username}`)
    .then((res) => res.data.user);

  if (user) {
    return user;
  } else {
    return null;
  }
}
