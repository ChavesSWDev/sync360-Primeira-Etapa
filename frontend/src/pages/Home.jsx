import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch, FaTrashAlt, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();

    // Estados: usuários, loading, erro, status do servidor, busca e lista filtrada
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serverOnline, setServerOnline] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Função pra carregar os usuários do backend
    const fetchUsuarios = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:3001/usuario'); // rota backend pra listar usuários
            if (!res.ok) throw new Error('Erro ao buscar usuários');
            const data = await res.json();
            setUsuarios(data);
            setServerOnline(true);
        } catch (err) {
            setError(err.message);
            setServerOnline(false);
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    // carregar usuários quando a página montar
    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Filtra usuários pelo termo de busca
    const filteredUsuarios = usuarios.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Função pra deletar usuário (só um fetch DELETE simples)
    const handleDelete = async (id) => {
        if (!window.confirm('Quer mesmo deletar esse usuário?')) return;

        try {
            const res = await fetch(`http://localhost:3001/usuario/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Falha ao deletar');
            // Atualiza lista local após deletar
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            alert('Erro ao deletar usuário: ' + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <Header />
            <main className="max-w-6xl mx-auto p-4 sm:p-6">
                {/* Status do servidor + título */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-l from-blue-700 to-blue-900 bg-clip-text text-transparent"
                    >
                        Desafio Sync360 - Usuários
                    </motion.h1>

                    <div className="flex items-center gap-2">
                        {serverOnline ? (
                            <FaCheckCircle className="text-green-600 text-lg sm:text-xl" />
                        ) : (
                            <FaTimesCircle className="text-red-600 text-lg sm:text-xl" />
                        )}
                        <span className={`font-semibold text-sm sm:text-base ${serverOnline ? 'text-green-600' : 'text-red-600'}`}>
                            {serverOnline ? 'Servidor Online' : 'Servidor Offline'}
                        </span>
                    </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute top-4 left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar usuário pelo nome..."
                            className="w-full pl-10 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border-2 border-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={loading || !serverOnline}
                        />
                    </div>
                    <button
                        onClick={() => navigate('/profile/create')}
                        className="flex items-center justify-center gap-2 bg-gradient-to-l from-blue-800 to-blue-600 text-white px-4 py-2 rounded hover:brightness-110 shadow transition text-sm sm:text-base border-2 border-black font-bold"
                    >
                        <FaUserPlus className='text-xl' /> Criar Usuário
                    </button>
                </div>

                {/* Lista de usuários */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-y-auto max-h-[600px]"
                >
                    {loading ? (
                        <p className="text-center text-gray-600 text-sm">Carregando usuários...</p>
                    ) : error ? (
                        <p className="text-center text-red-600 text-sm">Erro: {error}</p>
                    ) : filteredUsuarios.length === 0 ? (
                        <p className="italic text-center text-gray-600 text-sm">Nenhum usuário encontrado.</p>
                    ) : (
                        <ul className="space-y-4">
                            {filteredUsuarios.map((user) => (
                                <motion.li
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 p-4 sm:p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    {/* Imagem + Dados */}
                                    <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-4 w-full">
                                        <img
                                            src={user.image || 'https://via.placeholder.com/60'}
                                            alt={user.name}
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-600 mb-3 md:mb-0 md:mx-0"
                                        />
                                        <div>
                                            <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {user.neighborhood}, {user.state}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botões */}
                                    <div className="w-full md:w-auto border-t border-gray-300 sm:border-t-0 pt-3 sm:pt-0 flex gap-2 justify-center sm:justify-end">
                                        <button
                                            onClick={() => navigate(`/profile/${user.id}`)}
                                            className="w-1/2 md:w-auto flex items-center justify-center gap-1 bg-gradient-to-r from-green-500 to-green-700 hover:brightness-110 shadow hover:shadow-lg text-white py-2 px-4 rounded-md text-sm transition border-2 border-black"
                                            title="Visualizar Dados"
                                        >
                                            <FaEye /> Ver
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="w-1/2 md:w-auto flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:brightness-110 shadow-sm hover:shadow-lg text-sm sm:text-base py-2 px-4 rounded-md transition border-2 border-black"
                                            title="Deletar Usuário"
                                        >
                                            <FaTrashAlt /> Deletar
                                        </button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </main>
        </div>
    );

};

export default Home;
