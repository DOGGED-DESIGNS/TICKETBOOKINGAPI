const request = require("supertest");
// const { sequelize, Event } = require("../models");
const Sequelize = require("../src/config/database");
const Event = require("../model/Event");
const app = require("../app");

beforeAll(async () => {
  // Set up the database before running tests
  await Sequelize.sync();
});

afterEach(async () => {
  // Clear the Event table after each test
  await Event.destroy({ truncate: true });
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await Sequelize.close();
});

// Integration Tests
describe("Integration Tests for POST /api/v1/events", () => {
  it("should create a new event successfully", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Concert",
        date: new Date("2024-12-01"),
        ticketCount: 100,
      })
      .expect("Content-Type", /json/)
      .expect(201);

    // Verify response contains correct event data
    expect(response.body.name).toBe("Concert");
    expect(response.body.date).toBe(new Date("2024-12-01").toISOString());
    expect(response.body.ticketCount).toBe(100);
    expect(response.body.bookedTickets).toBe(0);
  });

  it("should store the event in the database", async () => {
    await request(app)
      .post("/api/v1/events")
      .send({
        name: "Seminar",
        date: new Date("2024-11-15"),
        ticketCount: 50,
      })
      .expect(201);

    // Check if the event was actually saved in the database
    const savedEvent = await Event.findOne({ where: { name: "Seminar" } });
    expect(savedEvent).toBeDefined();
    expect(savedEvent.ticketCount).toBe(50);
  });
});

// Unit Tests
describe("Unit Tests for POST /api/events", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({}) // No data sent
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  it("should return 400 if ticket count is negative", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Concert",
        date: new Date("2024-12-01"),
        ticketCount: -10, // Invalid ticket count
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  it("should return 400 if the date is invalid", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Concert",
        date: "invalid-date", // Invalid date
        ticketCount: 100,
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBeDefined();
  });
});
