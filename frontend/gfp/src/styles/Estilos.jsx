export const corPrincipal = '#405da8';
export const corSecundaria = '#5cafe4';
export const corTextos = '#344b9b';
export const corFundo = '#e6ecff';
export const corFundo2 = '#ffffff';

const Estilos = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
                 
  },
  loginBox: {
    padding: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '300px',
    height: '300px',
    backgroundColor: corFundo2, 
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    marginTop: '15%'
  },
  logo: {
    height: '50px',
    marginBottom: '10px',
  },
  h2: {
    color: '#0000ff',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  inputGroupLabel: {
    display: 'block',
  },
  inputGroupInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  loginButton: {
    width: '100%',
    background: '#0000ff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  
  botoes: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  conteudo: {
    display: 'flex',
    gap: 50,
    height: '100vh', 
    backgroundColor: corFundo, 
    fontFamily: 'Arial'
  }
};

export default Estilos;
