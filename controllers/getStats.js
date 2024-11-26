import Urls from '../models/urls.js';

export const getStats = async (req, res) => {
    try {
        const shortId = req.query.shortId;
        
        //Finding Url with shortId in Database
        const info = await Urls.findOne({ shortId });

        if (!info) {
            return res.status(404).send("Data not Found");
        }
        else res.send(info);
        
    } catch (error) {
        console.error("Error in giveUrl:", error);
        res.status(500).send("Internal Server Error");
    }
};