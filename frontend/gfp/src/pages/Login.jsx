import { useNavigate, Link} from "react-router-dom";
import Estilos from "../styles/Estilos";


export default function Login() {
    const navigate = useNavigate();

    return (
        <div style={Estilos.conteudo}> 

            <h1> Tela de Login </h1>
            <button onClick={() => navigate("/principal")}> Entrar </button>
        </div>
        
    )
}