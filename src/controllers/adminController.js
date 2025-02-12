const db = require('../config/db');

const addTrain = async (req, res) => {
  try {
    const { train_number, source, destination, totalSeats,availableSeats } = req.body;
    const result = await db.query(
      'INSERT INTO trains (train_number, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?) ',
      [train_number, source, destination, totalSeats, availableSeats]
    );
    console.log(result);
    res.json({ message: 'Train added successfully', trainId: result.insertId });
  } catch (error) {
    console.error("Error adding train:", error)
    res.status(500).json({ error: error.message });
  }
};
const updateTrain = async (req, res) => {
  try {
    const { id } = req.params
    const { train_number, source, destination, totalSeats ,availableSeats} = req.body
    const result = await db.query(
      "UPDATE trains SET train_number = ?, source = ?, destination = ?, total_seats = ?, available_seats = ? WHERE id = ?",
      [train_number, source, destination, totalSeats,availableSeats, id],
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Train not found" })
    }
    res.json({ message: "Train updated", trainId: result.insertId })
  } catch (error) {
    console.error("Error updating train:", error)
    res.status(500).json({ error: "An error occurred while updating the train" })
  }
}
const deleteTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'DELETE FROM trains WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    console.error('Error deleting train:', error);
    res.status(500).json({ error: 'An error occurred while deleting the train' });
  }
};

module.exports = { updateTrain, addTrain,deleteTrain }