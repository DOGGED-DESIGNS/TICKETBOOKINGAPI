const Sequelize = require("sequelize");
const sequelize = require("../src/config/database");

const Model = Sequelize.Model;

class Event extends Model {}

Event.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ticketCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookedTickets: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Event",
  }
);

module.exports = Event;
