
const Library = require('../models/Lib');


module.exports.getAllLibraryData = async (req, res) => {
    try {
        const data = await Library.findAll();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while getting data" });
    }
};