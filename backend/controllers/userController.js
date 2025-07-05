import * as userModel from '../models/userModel.js';

export const getAll = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

export const getById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

export const create = async (req, res) => {
    try {
        const insertedId = await userModel.createUser(req.body);
        res.status(201).json({ success: true, insertedId });
    } catch (err) {
        console.error('Erro ao salvar usuário:', err);
        res.status(500).json({ error: 'Erro ao salvar usuário' });
    }
};

export const update = async (req, res) => {
    try {
        const success = await userModel.updateUser(req.params.id, req.body);
        if (!success) return res.status(404).json({ error: 'Usuário não encontrado para atualizar' });
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const remove = async (req, res) => {
    try {
        const success = await userModel.deleteUser(req.params.id);
        if (!success) return res.status(404).json({ error: 'Usuário não encontrado para deletar' });
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};
