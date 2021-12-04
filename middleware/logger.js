const { writeFile } = require("fs/promises");

async function logger(req, res, next) {
  const { url, method } = req;

  const user = {
    url,
    method,
    time: new Date(),
  };

  const data = JSON.stringify(user);

  try {
    await writeFile("./content/logger.txt", data, {
      flag: "a",
    });
    next();
  } catch (error) {
    return res.status(500).json("Internal server error!");
  }
}

module.exports = logger;
