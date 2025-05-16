import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Estilos from "../styles/Estilos.css";
import { enderecoServidor } from "../utils";
import Principal from "./Principal";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lembrar, setLembrar] = useState(false);

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
        localStorage.setItem('UsuarioLogado', JSON.stringify(...dados, lembrar));
        // Redirecionar após login, se quiser:
        navigate("/principal");
      } else {
        setMensagem('Login ou senha incorretos ❌');
        throw new Error('Login ou senha incorretos ❌');
      }
    } catch (error) {
      console.error('Erro ao realizar login: ', error);
      alert(error.message);
      return;
    }
  }

  function botaoLimpar() {
    setEmail('');
    setSenha('');
    setMensagem('');
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
      <div style={Estilos.loginBox}>
        <div style={{flexDirection: 'row', display: 'flex'}}> 
        <img
          src="https://sesisenaispedu-my.sharepoint.com/personal/mariana_borba_portalsesisp_org_br/Documents/aCurso%20DEV/3%c2%ba%20Semestre/Projetos/GFP/frontend/gfp/src/assets/logo.png?Web=1"
          alt="Logo SENAI"
          style={Estilos.logo}
        />
        <div style={{marginTop: '5%'}}> 
        <h2> GFP </h2>
        <h5 style={{marginTop: -15}}> Gestor Financeiro Pessoal </h5>
        </div>
            </div>

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


              <div className={StyleSheet.between}>
                <div className={{display:'flex', alignItens:'center'}}>
                    <input type="checkbox" style={{marginRight:'5px'}} checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
                    <label>Lembrar-me</label>

                </div>
            </div>
                
              <a href="#" style={{color: '#000000',
                          fontSize: 14,
                          textAlign: 'right'}}>Esqueceu a senha?</a>
                
            </div>

            


          <div style={Estilos.botoes}>
            <button onClick={botaoEntrar} style={Estilos.loginButton}>Entrar</button>
            <button onClick={botaoLimpar} style={Estilos.cleanButton}>Limpar</button>
          </div>
        </div>

        <p>{mensagem}</p>
      </div>
      
  );
}
