import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaUser, FaBirthdayCake, FaMapMarkedAlt, FaCity, FaGlobeAmericas,
    FaImage, FaFileAlt, FaCheck, FaTimes
} from 'react-icons/fa';

const EditProfileForm = () => {
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/usuario/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.name || '',
                    age: data.age || '',
                    street: data.street || '',
                    neighborhood: data.neighborhood || '',
                    state: data.state || '',
                    bio: data.bio || '',
                    image: data.image || '',
                });
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:3001/usuario/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Erro ao salvar usuário');

            navigate(`/profile/${id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="p-6 text-center">Carregando dados do usuário...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
            <Header />
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white shadow-lg rounded-xl p-6 sm:p-8"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
                        <FaFileAlt /> Editar Perfil
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { label: 'Nome', name: 'name', icon: <FaUser />, type: 'text', required: true },
                            { label: 'Idade', name: 'age', icon: <FaBirthdayCake />, type: 'number', required: true },
                            { label: 'Rua', name: 'street', icon: <FaMapMarkedAlt />, type: 'text', required: true },
                            { label: 'Bairro', name: 'neighborhood', icon: <FaCity />, type: 'text', required: true },
                            { label: 'Estado', name: 'state', icon: <FaGlobeAmericas />, type: 'text', required: true },
                            { label: 'URL da Imagem', name: 'image', icon: <FaImage />, type: 'text', required: false },
                        ].map(({ label, name, icon, type, required }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    {icon} {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required={required}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
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
                                value={formData.bio}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                            ></textarea>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={saving}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-white font-bold transition-all text-sm sm:text-base ${saving
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-500 to-green-700 hover:brightness-110 shadow hover:shadow-lg border-2 border-black'
                                    }`}
                            >
                                <FaCheck />
                                {saving ? 'Salvando...' : 'Salvar Alterações'}
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => navigate(`/profile/${id}`)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-red-500 to-red-700 hover:shadow-lg hover:brightness-110 text-white font-bold shadow-sm text-sm sm:text-base border-2 border-black"
                            >
                                <FaTimes /> Cancelar
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default EditProfileForm;
