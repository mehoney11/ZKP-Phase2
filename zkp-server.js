//server.js bucket that receives hashes from the customer and seller pages and stores them in the database
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let sellerHashes = [];
let customerHashes = [];

app.post("/hashes", (req, res) => {
const { type, hashes } = req.body;
if (type === "seller") {
sellerHashes.push(...hashes);
} else if (type === "customer") {
customerHashes.push(...hashes);
}
res.sendStatus(200);
});

app.get("/check-matching-hashes", (req, res) => {
const { sellerHash, customerHash } = req.query;
if (sellerHashes.includes(sellerHash) && customerHashes.includes(customerHash)) {
res.send("true");
} else {
res.send("false");
}
});

app.listen(3000, () => {
console.log("Server listening on port 3000");
});

/*
const express = require("express");
const app = express();

app.use(express.json());

app.post("/hashes", (req, res) => {
const hashes = req.body.hashes;
// Store the hashes in your bucket
res.sendStatus(200);
});

app.listen(3000, () => {
console.log("Server listening on port 3000");
});
*/