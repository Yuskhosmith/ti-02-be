const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const Recipe = require("../models/recipe.model"); // Adjust path if necessary


afterEach(async () => {
  // Clear test data after each test
  await Recipe.deleteMany({});
});

afterAll(async () => {
  // Disconnect after all tests
  await mongoose.disconnect();
});

// Test the basic API connection
describe("GET /", () => {
  it("should respond with a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World! API is working");
  });
});

// Test CRUD operations for /api/recipes
describe("/api/recipes", () => {
  // Test the POST endpoint
  it("should create a new recipe", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .send({
        title: "Pasta",
        ingredients: ["flour", "water"],
        instructions: ["Mix ingredients", "Cook pasta"],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.title).toBe("Pasta");
  });

  // Test the GET endpoint for fetching all recipes
  it("should fetch all recipes", async () => {
    await Recipe.create({
      title: "Pasta",
      ingredients: ["flour", "water"],
      instructions: ["Mix ingredients", "Cook pasta"],
    });

    const res = await request(app).get("/api/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0]).toHaveProperty("title", "Pasta");
  });

  // Test GET /:id endpoint
  it("should fetch a single recipe by ID", async () => {
    const recipe = await Recipe.create({
      title: "Pasta",
      ingredients: ["flour", "water"],
      instructions: ["Mix ingredients", "Cook pasta"],
    });

    const res = await request(app).get(`/api/recipes/${recipe._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("title", "Pasta");
  });

  // Test PUT /:id endpoint
  it("should update an existing recipe", async () => {
    const recipe = await Recipe.create({
      title: "Pasta",
      ingredients: ["flour", "water"],
      instructions: ["Mix ingredients", "Cook pasta"],
    });

    const res = await request(app)
      .put(`/api/recipes/${recipe._id}`)
      .send({
        title: "Updated Pasta",
        ingredients: ["flour", "water"],
        instructions: ["Mix ingredients", "Cook pasta"],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("title", "Updated Pasta");
  });

  // Test DELETE /:id endpoint
  it("should delete a recipe", async () => {
    const recipe = await Recipe.create({
      title: "Pasta",
      ingredients: ["flour", "water"],
      instructions: ["Mix ingredients", "Cook pasta"],
    });

    const res = await request(app).delete(`/api/recipes/${recipe._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Recipe deleted successfully");

    const check = await Recipe.findById(recipe._id);
    expect(check).toBeNull();
  });
});
