import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { enderecoServidor } from '../utils'
import { MdCreditCard, MdSave, MdClose } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom'
import Estilos from '../styles/Estilos.jsx'

export default function CadCategorias() {

    const { dadosUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();
    const Location = useLocation();

    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('CONTA_CORRENTE');
    const [icone, setIcone] = useState(0);

    const itemAlterar = location.state?.itemAlterar || null;

    useEffect(() => {
        if(itemAlterar){
            setNome(itemAlterar.nome);
            setCor(itemAlterar.cor);
            setIcone(itemAlterar.icone)
        }
    }, []); 

    const botaoSalvar = async () => {
        if (nome.trim() == '') {
            alert('Informe o nome da categoria')
            return
        }
        const dados = {
            nome: nome,
            cor: cor,
            icone: icone
        }
        try {
            let endpoint = `${enderecoServidor}/categorias`
            let metodo = 'POST'

            if (itemAlterar){
                endpoint = `${enderecoServidor}/categorias/${itemAlterar.id_categoria}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify(dados)
            })
    
            if (resposta.ok) {
                alert('Categoria cadastrada com sucesso!')
                navigate('/categorias')
            }
        } catch (error) {
            alert('Erro ao salvar categoria:', error.message);
            console.error('Erro ao salvar categoria:', error)
        }
    }

    return (
    <div className="flex justify-center py-6 px-4">
      <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800">
        {/* Cabeçalho */}
        <header className="flex itens-center gap-2 mb-6 border-b border-white-200 pb-4">
          <MdCreditCard className="text-red-600 h-8" />
          <h2 className="text-2xl font-bold">
            { itemAlterar ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
        </header>

        {/* Formulário de Cadastro */}
        <div className="space-y-5">
          <label className={Estilos.labelCadastro}>Nome da Categoria</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Alimentação"
            className={Estilos.inputCadastro}
          />
          <input
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="Ex: Rosa"
            className={Estilos.inputCadastro}
          />
          <input
            type="text"
            value={icone}
            onChange={(e) => setIcone(e.target.value)}
            placeholder="Ex: ---"
            className={Estilos.inputCadastro}
          />
          {/* Botões de controle */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/categorias")}
            >
              <MdClose /> Cancelar
            </button>
            <button className={Estilos.botao} onClick={botaoSalvar}>
              <MdSave /> Salvar
            </button>
          </div>
        </div>
      </section>
    </div>
  );

}