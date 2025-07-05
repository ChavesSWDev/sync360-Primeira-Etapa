import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import {
    FaUser, FaBirthdayCake, FaMapMarkedAlt, FaCity, FaGlobeAmericas,
    FaFileAlt, FaImage, FaCheck, FaTimes
} from 'react-icons/fa';

const CreateUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        street: '',
        neighborhood: '',
        state: '',
        bio: '',
        image: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Erro ao criar usuário');

            setSuccess(true);
            setTimeout(() => navigate('/home'), 2000);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
            <Header />
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
                        <FaUser /> Criar Novo Usuário
                    </h1>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 text-red-600 font-semibold"
                        >
                            ❌ {error}
                        </motion.p>
                    )}

                    {success && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 text-green-600 font-semibold"
                        >
                            ✅ Usuário criado com sucesso! Redirecionando...
                        </motion.p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: 'Nome', name: 'name', icon: <FaUser />, type: 'text', required: true },
                            { label: 'Idade', name: 'age', icon: <FaBirthdayCake />, type: 'number', required: true },
                            { label: 'Rua', name: 'street', icon: <FaMapMarkedAlt />, type: 'text', required: true },
                            { label: 'Bairro', name: 'neighborhood', icon: <FaCity />, type: 'text', required: true },
                            { label: 'Estado', name: 'state', icon: <FaGlobeAmericas />, type: 'text', required: true },
                            { label: 'URL da Imagem', name: 'image', icon: <FaImage />, type: 'text' },
                        ].map(({ label, name, icon, type, ...rest }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    {icon} {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                                    {...rest}
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <FaFileAlt /> Biografia
                            </label>
                            <textarea
                                name="bio"
                                rows={4}
                                required
                                value={formData.bio}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                            ></textarea>
                        </div>

                        {formData.image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-center mt-4"
                            >
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-600 shadow"
                                />
                            </motion.div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-white font-semibold transition-all text-sm sm:text-base ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-500 to-green-700 hover:brightness-110 shadow hover:shadow-lg border-2 border-black'
                                    }`}
                            >
                                <FaCheck />
                                {isSubmitting ? 'Salvando...' : 'Salvar Usuário'}
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => navigate('/home')}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold shadow-sm text-sm sm:text-base hover:brightness-110 hover:shadow-lg border-2 border-black"
                            >
                                <FaTimes />
                                Cancelar
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default CreateUser;
