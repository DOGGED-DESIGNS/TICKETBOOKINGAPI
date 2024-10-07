const Event = require("../model/Event");

const newEvent = async (req, res) => {
  const { name, date, ticketCount } = req.body;

  if (ticketCount < 0) {
    const error = new Error("invalid ticket number");
    error.status = 400;
    throw error;
  }

  // const isValidDate = (date) => !isNaN(new Date(date).getTime());
  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()); // Check if the date is valid
  };

  if (!isValidDate(date)) {
    const error = new Error("invalide date");
    error.status = 400;
    throw error;
  }

  try {
    const newEvent = await Event.create({ name, date, ticketCount });
    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const bookEvent = (req, res) => {};
const cancelEvent = (req, res) => {};
const getStatus = (req, res) => {};

module.exports = {
  newEvent,
  bookEvent,
  cancelEvent,
  getStatus,
};
