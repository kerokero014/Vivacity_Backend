import { Request, Response } from "express";
import pool from "../config/db";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await pool.query("SELECT * FROM users");
    res.status(200).json(response.rows);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(response.rows);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    address,
    github,
    linkedin,
    fun_facts,
    who_i_am,
    hobbies,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, phone_number, date_of_birth, address, github, linkedin, fun_facts, who_i_am, hobbies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        address,
        github,
        linkedin,
        fun_facts,
        who_i_am,
        hobbies,
      ]
    );
    if (result && result.rows && result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      throw new Error("Failed to create user");
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error creating user:", e);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    address,
    github,
    linkedin,
    fun_facts,
    who_i_am,
    hobbies,
  } = req.body;

  try {
    const response = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, date_of_birth = $5, address = $6, github = $7, linkedin = $8, fun_facts = $9, who_i_am = $10, hobbies = $11 WHERE id = $12",
      [
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        address,
        github,
        linkedin,
        fun_facts,
        who_i_am,
        hobbies,
        id,
      ]
    );
    res.json("User updated successfully");
  } catch (e) {
    console.error("Error updating user:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json(`User ${id} deleted successfully`);
  } catch (e) {
    res.status(500).json(e);
  }
};
