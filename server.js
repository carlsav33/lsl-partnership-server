
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const PASSWORD = "l1zz4nn34PL4Yr1d3r";

let partnerships = {};

function checkPW(req, res) {
  if (req.query.PW !== PASSWORD) {
    res.status(401).send("Unauthorized: Invalid password");
    return false;
  }
  return true;
}

app.get("/get_partner", (req, res) => {
  if (!checkPW(req, res)) return;

  const user = req.query.User;
  if (!user) {
    res.status(400).send("Bad Request: Missing User parameter");
    return;
  }

  const partner = partnerships[user] || "";
  res.send(partner);
});

app.get("/set_partner", (req, res) => {
  if (!checkPW(req, res)) return;

  const user = req.query.User;
  const partner = req.query.Partner;

  if (!user || partner === undefined) {
    res.status(400).send("Bad Request: Missing User or Partner parameter");
    return;
  }

  if (partner === "") {
    delete partnerships[user];
  } else {
    partnerships[user] = partner;
  }

  res.send("OK");
});

app.listen(port, () => {
  console.log(`Partnership manager server running on port ${port}`);
});
