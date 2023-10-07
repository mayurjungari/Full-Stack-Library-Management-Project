const express = require('express');
const path = require('path');
const router = express.Router();
const Library=require('../models/Lib')
const GetDATA=require('../controller/getdataController')
const DeleteData=require('../controller/deletedataController')
const PostData=require('../controller/postdataController')

router.get('/library', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'Views', 'Library.html'));
});

router.get('/library/getdata',GetDATA.getAllLibraryData);
router.delete('/library/delete/:id',DeleteData.deleteDataa)
router.post('/library',PostData.postDataa)

module.exports = router;
