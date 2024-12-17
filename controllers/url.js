const shortid = require("nanoid");
const URL = require("../models/url");

async function generateShortUrl(req, res) {
  const shortId = shortid.nanoid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function getAllUrls(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}


async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    console.log(result);
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

async function getAllShortUrl(req, res){
    const allData = await URL.find({});
    return res.json(allData);
}

module.exports = {
  generateShortUrl,
  getAllUrls,
  getAnalytics,
  getAllShortUrl
};
