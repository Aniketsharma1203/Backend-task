import { v4 as uuidv4 } from 'uuid';
import Urls from '../models/urls.js';
import validUrl from 'valid-url'

export const handleUrl = async (req, res) => {
  const { original_url } = req.body;

  //Validating URL if its present or valid or not.
  if (!original_url || !validUrl.isUri(original_url)) {
    return res.status(400).json({ error: "Invalid URL provided. " });
  }

  try {

    //Finding If URL already Exists or not.
    const existingUrl = await Urls.findOne({ originalUrl: original_url });
    if (existingUrl) {
      return res.status(200).json({
        message: "Shortener already exists.",
        shortId: existingUrl.shortId
      });
    }

    //Using uuid for random generation of numbers.
    const uuid = uuidv4();
    const shortString = uuid.replace(/-/g, '').slice(0, 6);

    //Inserting data in Mongoose
    const newUrl = await Urls.create({
      originalUrl: original_url,
      shortId: shortString,
      clicks: 0,
      lastAccessed: null,
    });

    res.status(201).json({
      message: "Short URL created successfully.",
      shortId: newUrl.shortId,
    });
  } catch (error) {
    console.error("Error in handleUrl:", error);
    res.status(500).json({ error: "An error occurred while creating the short URL." });
  }
};



export const giveUrl = async (req, res) => {
  try {
    const shortId = req.query.shortId;
    const mainUrl = await Urls.findOne({ shortId });

    if (!mainUrl) {
      return res.status(404).send("Data not Found");
    }

    mainUrl.clicks = (mainUrl.clicks || 0) + 1;
    mainUrl.lastAccessed = new Date();
    await mainUrl.save();

    // Redirect to the original URL
    res.redirect(mainUrl.originalUrl);
  } catch (error) {
    console.error("Error in giveUrl:", error);
    res.status(500).send("Internal Server Error");
  }
};