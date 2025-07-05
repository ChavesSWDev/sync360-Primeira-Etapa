import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaHome, FaRegEdit, FaArrowLeft, FaUser, FaMapMarkedAlt, FaFileAlt } from 'react-icons/fa';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/usuario/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar dados');
                return res.text(); // continua usando .text()
            })
            .then(text => {
                try {
                    return text ? JSON.parse(text) : {};
                } catch {
                    throw new Error('Resposta inválida do servidor');
                }
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="p-6 text-center">Carregando perfil...</p>;
    if (error) return <p className="p-6 text-center text-red-500">Erro: {error}</p>;
    if (!user) return <p className="p-6 text-center">Nenhum usuário encontrado.</p>;

    return (
        <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6"
                >
                    <motion.img
                        src={user.image || 'https://via.placeholder.com/150'}
                        alt={`Foto de perfil de ${user.name}`}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-600 shadow-md"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="flex-1 w-full">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-center md:text-left flex items-center gap-2">
                            <FaUser className="text-blue-600" />
                            {user.name}
                        </h2>

                        <hr className="my-3 border-gray-300" />

                        <section className="mb-4">
                            <h3 className="text-lg sm:text-xl font-medium mb-1 flex items-center gap-2 text-blue-700">
                                <FaBirthdayCake /> Idade
                            </h3>
                            <p className="text-gray-700 text-base sm:text-lg">{user.age} anos</p>
                        </section>

                        <hr className="my-3 border-gray-300" />

                        <section className="mb-4">
                            <h3 className="text-lg sm:text-xl font-medium mb-1 flex items-center gap-2 text-green-700">
                                <FaHome /> Endereço
                            </h3>
                            <p className="text-gray-700 text-base sm:text-lg">
                                <span className="font-bold">Rua: </span>{user.street}
                            </p>
                            <p className="text-gray-700 text-base sm:text-lg">
                                <span className="font-bold">Bairro: </span>{user.neighborhood}
                            </p>
                            <p className="text-gray-700 text-base sm:text-lg">
                                <span className="font-bold">Estado: </span>{user.state}
                            </p>
                        </section>

                        <hr className="my-3 border-gray-300" />

                        <section>
                            <h3 className="text-lg sm:text-xl font-medium mb-1 flex items-center gap-2 text-purple-700">
                                <FaFileAlt /> Biografia
                            </h3>
                            <p className="italic text-gray-600 text-sm sm:text-base">
                                {user.bio || 'Usuário sem biografia cadastrada.'}
                            </p>
                        </section>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => navigate(`/profile/edit/${id}`)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-md shadow hover:shadow-lg hover:brightness-110 transition-all text-sm sm:text-base font-bold border-2 border-black"
                            >
                                <FaRegEdit className='text-xl' />
                                Editar Perfil
                            </button>
                            <button
                                onClick={() => navigate('/home')}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 px-4 py-2 rounded-md shadow hover:shadow-lg hover:brightness-110 transition-all text-sm sm:text-base font-bold border-2 border-black"
                            >
                                <FaArrowLeft />
                                Voltar para Home
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default UserProfile;
