const Library = require('../models/Lib');
module.exports.postDataa=async (req, res) => {
    try {
        const { bookname, idate, rdate } = req.body;

        console.log('Received data:', { bookname, idate, rdate }); 

        const newlib = await Library.create({
            BOOKNAME: bookname,
            ISSUEDATE: idate,
            RETURNDATE: rdate,
        });

        console.log('New library record:', newlib); 

        res.status(201).send('Data successfully submitted to the database');
        
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).send('Internal Server Error');
    }
}