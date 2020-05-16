require("dotenv").config();

const Twit = require("twit");

const regex = /twitter\.com\/.*\/status(?:es)?\/([^\/\?]+)/;

const twit = new Twit({
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
});

module.exports = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.sendStatus(400);
    }

    const id = regex.exec(url)[1];

    if (!id) {
      return res.sendStatus(400);
    }

    const tweet = await twit.get(`statuses/show`, {
      id,
      include_ext_alt_text: true,
    });

    const images = tweet.data.extended_entities.media
      .filter((media) => media.type !== "video")
      .map((image) => ({
        src: image.media_url,
        alt: image.ext_alt_text,
      }));

    return res.send(JSON.stringify(images, null, 2));
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
