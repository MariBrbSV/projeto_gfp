import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
    const [usuario, setUsuario] = useState();

    useEffect(() => {
        const buscarUsuario = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigate('/');
            }
        }
        buscarUsuario();
    }, [])

    const botaoLogout = () => {
        try {
            localStorage.removeItem('UsuarioLogado');
            navigate('/')
        }   catch (error) {
            console.error('Erro ao deslogar', error)
        }
    };

    return (
        <h1> Tela principal </h1>
    )
}