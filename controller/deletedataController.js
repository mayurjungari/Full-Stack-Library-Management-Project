const Library = require('../models/Lib');
module.exports.deleteDataa= async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Received DELETE request for book ID:', id);
        // Use Sequelize to delete the book by ID
        const removedbook = await Library.destroy({
            where: {
                id: id
            }
        });
        if (removedbook) {
            res.status(204).send(); // Successfully deleted
        } else {
            res.status(404).json({ error: 'Book  not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

