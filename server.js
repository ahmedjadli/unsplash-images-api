const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const next = require("next");
const db = require("./src/utils/db/index.js");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.post("/api/users/login", (req, res) => {
      const { username, password } = req.body;
      db.get(username, (err, user) => {
        if (err) {
          res.status(500).json({ succcess: false, error: err.message });
        } else if (!user) {
          res
            .status(400)
            .json({ succcess: false, error: "Nom d'utilisateur invalide !" });
        } else if (user.password !== password) {
          res
            .status(400)
            .json({ succcess: false, error: "Mote de passe invalide ! " });
        } else if (!user.isActive)
          res
            .status(400)
            .json({ succcess: false, error: "Ce compte a été bloqué" });
        else {
          token = jsonwebtoken.sign({ user }, process.env.JWT_SECRET);

          res.status(200).json({
            succcess: true,
            message: "Login successful",
            user: {
              name: user.name,
              email: user.email,
              username: user.username,
              isActive: user.isActive,
              token: token,
            },
          });
        }
      });
    });

    server.post("/api/users/:username", (req, res) => {
      const { username } = req.params;
      db.get(username, (err, user) => {
        if (err) {
          res.status(500).json({ succcess: false, error: err.message });
        } else if (!user) {
          res

            .status(400)
            .json({ succcess: false, error: "Nom d'utilisateur invalide !" });
        } else {
          res.status(200).json({
            succcess: true,
            message: "user found",
            user: {
              name: user.name,
              email: user.email,
              username: user.username,
              isActive: user.isActive,
            },
          });
        }
      });
    });

    server.patch("/api/image/like", (req, res) => {
      const { username, id } = req.body;

      db.put(`${username}!likes!${id}`, "true", (err) => {
        if (err) res.status(500).json({ succcess: false, error: err.message });
        else res.status(200).json({ succcess: true, message: "like added" });
      });
    });

    server.post("/api/image/liked", (req, res) => {
      const { username, id } = req.body;
      db.get(`${username}!likes!${id}`, (err, like) => {
        if (like) res.status(200).json({ succcess: true, liked: true });
        else res.status(200).json({ succcess: true, liked: false });
      });
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
