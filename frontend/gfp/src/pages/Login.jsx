import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Estilos from "../styles/Estilos";
import { enderecoServidor } from "../utils";
import Principal from "./Principal";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email === '' || senha === '') {
        throw new Error('Preencha todos os campos');
      }

      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setMensagem('Login bem-sucedido! ✅');
        localStorage.setItem('UsuarioLogado', JSON.stringify(dados));
        // Redirecionar após login, se quiser:
        navigate("/principal");
      } else {
        setMensagem('Login ou senha incorretos ❌');
        throw new Error('Login ou senha incorretos ❌');
      }
    } catch (error) {
      console.error('Erro ao realizar login: ', error);
      alert(error.message);
    }
  }

  function botaoLimpar() {
    setEmail('');
    setSenha('');
    setMensagem('');
  }

  return (
    <div style={Estilos.conteudo}>
        <div style={{backgroundColor: '#344b9b', width: '30%', height: '900px', margin: 0 }}> 
        </div>
      <div style={Estilos.loginBox}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXT5mTm68NXB258gwdNWMu9qSuFReLMeWeow&s"
          alt="Logo SENAI"
          style={Estilos.logo}
        />
        <h2 style={Estilos.h2}>Login</h2>

        <div>
          <div style={Estilos.inputGroup}>
            <label style={Estilos.inputGroupLabel}>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Digite seu email"
              required
              style={Estilos.inputGroupInput}
            />
          </div>

          <div style={Estilos.inputGroup}>
            <label style={Estilos.inputGroupLabel}>Senha</label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              type="password"
              placeholder="Digite sua senha"
              required
              style={Estilos.inputGroupInput}
            />
          </div>

          <div style={Estilos.botoes}>
            <button onClick={botaoEntrar} style={Estilos.loginButton}>Entrar</button>
            <button onClick={botaoLimpar} style={Estilos.loginButton}>Limpar</button>
          </div>
        </div>

        <p>{mensagem}</p>
      </div>
    </div>
  );
}
