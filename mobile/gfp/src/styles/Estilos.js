export const corPrincipal = '#405da8'
export const corSecundaria = '#5cafe4'
export const corTextos = '#344b9b'
export const corFundo = '#e6ecff'
export const corFundo2 = '#ffffff'

const Estilos = {
    conteudo : {
        flex: 1,
        width: '100%',
        backgroundColor: corFundo,
        color: corTextos,
        fontFamily: 'Arial',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao: {
        width: 50,
        height: 50,
        backgroundColor: corPrincipal,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10
    },
    titulo: {
        color: corTextos, 
        fontWeight: 'bold',
        lineHeight: 50,
        fontSize: 30
    },
    estBotao: {
        width: 150,
        height: 40,
        backgroundColor: corPrincipal,
        borderRadius: 15,
        color: corFundo2,
        textAlign: 'center',
        alignContent: 'center',
        fontFamily: 'Arial'
    }
}

export default Estilos;