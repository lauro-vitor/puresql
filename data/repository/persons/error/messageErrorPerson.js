
module.exports  = error => {
        switch(error.errno) {
            case 1452:
                return `Error ao adicionar Person, referência de usuário inexistente : ${error.sqlMessage}`;
            case 1064:
                return `Erro de sintaxe SQL : ${error.sqlMessage}!`;
            case 1048:
                return `Contém campos nulos, dados inválidos : ${error.sqlMessage} `;
            default :
                return `Error Não conhecido : ${error.sqlMessage}`;
        }
}