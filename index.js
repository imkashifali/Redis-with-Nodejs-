const express = require("express");
const redis = require("redis");
const util = require("util");
const axios = require("axios");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

client.set = util.promisify(client.set).bind(client);
client.get = util.promisify(client.get).bind(client);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const response = await client.set(key, value);
  res.json(response);
});

app.get("/", async (req, res) => {
  const { key } = req.body;
  const value = await client.get(key);
  res.json(value);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  // const cachePost = await client.get(`post-${id}`);

  // if (cachePost) {
  //   return res.json(JSON.parse(cachePost));
  // }

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${1}`
  );
  // client.set(`post-${id}`, JSON.stringify(response.data), "EX", 100);

  return res.json(response.data);
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
