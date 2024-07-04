// personalController.test.ts

import {
  getUsers,
  deleteUser,
  getUser,
  updateUser,
  createUser,
} from "../controllers/personalController";
import pool from "../config/db";
import { Request, Response } from "express";

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

describe("User Controller Functions", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" },
      body: {
        // Mocking req.body or fake body
        first_name: "Updated First Name",
        last_name: "Updated Last Name",
        email: "updated@example.com",
        phone_number: "1234567890",
        date_of_birth: "2000-01-01",
        address: "Updated Address",
        github: "updatedgithub",
        linkedin: "updatedlinkedin",
        fun_facts: "Updated fun facts",
        who_i_am: "Updated who I am",
        hobbies: "Updated hobbies",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should return list of users", async () => {
      const mockRows = [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

      await getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRows);
    });

    it("should handle errors", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(errorMessage);

      await getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("getUser", () => {
    it("should return user details for a valid ID", async () => {
      const mockUser = { id: 1, name: "Test User" };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

      await getUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith([mockUser]);
    });

    it("should handle error if database query fails", async () => {
      const errorMessage = "Database error";
      (pool.query as jest.Mock).mockRejectedValueOnce(errorMessage);

      await getUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("deleteUser", () => {
    it("should delete user for a valid ID", async () => {
      const id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      await deleteUser(mockRequest as Request, mockResponse as Response);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM users WHERE id = $1",
        [id]
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(
        `User ${id} deleted successfully`
      );
    });
  });

  describe("updateUser", () => {
    it("should update user for a valid ID", async () => {
      const id = 1;
      (pool.query as jest.Mock).mockResolvedValueOnce({});

      await updateUser(mockRequest as Request, mockResponse as Response);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, date_of_birth = $5, address = $6, github = $7, linkedin = $8, fun_facts = $9, who_i_am = $10, hobbies = $11 WHERE id = $12",
        [
          mockRequest.body.first_name,
          mockRequest.body.last_name,
          mockRequest.body.email,
          mockRequest.body.phone_number,
          mockRequest.body.date_of_birth,
          mockRequest.body.address,
          mockRequest.body.github,
          mockRequest.body.linkedin,
          mockRequest.body.fun_facts,
          mockRequest.body.who_i_am,
          mockRequest.body.hobbies,
          id,
        ]
      );
      expect(mockResponse.json).toHaveBeenCalledWith(
        "User updated successfully"
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user and return the user object", async () => {
      const mockUser = {
        id: 1,
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        phone_number: "1234567890",
        date_of_birth: "2000-01-01",
        address: "123 Test Street",
        github: "testgithub",
        linkedin: "testlinkedin",
        fun_facts: "Test fun facts",
        who_i_am: "Test who I am",
        hobbies: "Test hobbies",
      };
      (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

      await createUser(mockRequest as Request, mockResponse as Response);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (first_name, last_name, email, phone_number, date_of_birth, address, github, linkedin, fun_facts, who_i_am, hobbies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [
          mockRequest.body.first_name,
          mockRequest.body.last_name,
          mockRequest.body.email,
          mockRequest.body.phone_number,
          mockRequest.body.date_of_birth,
          mockRequest.body.address,
          mockRequest.body.github,
          mockRequest.body.linkedin,
          mockRequest.body.fun_facts,
          mockRequest.body.who_i_am,
          mockRequest.body.hobbies,
        ]
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  });
});
