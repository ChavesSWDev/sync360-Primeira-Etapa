import pool from '../db/connection.js';

export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuario');
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0];
};

export const createUser = async (user) => {
    const { name, age, street, neighborhood, state, bio, image } = user;
    const [result] = await pool.query(
        `INSERT INTO usuario (name, age, street, neighborhood, state, bio, image)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, age, street, neighborhood, state, bio, image]
    );
    return result.insertId;
};

export const updateUser = async (id, user) => {
    const { name, age, street, neighborhood, state, bio, image } = user;
    const [result] = await pool.query(
        `UPDATE usuario
     SET name = ?, age = ?, street = ?, neighborhood = ?, state = ?, bio = ?, image = ?
     WHERE id = ?`,
        [name, age, street, neighborhood, state, bio, image, id]
    );
    return result.affectedRows > 0;
};

export const deleteUser = async (id) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

