import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.4",
  info: {
    title: "API do Gestor Financeiro Pessoal",
    version: "1.0.0",
    description: `API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI`,
  },
  servers: [
    {
      url: "http://192.168.0.123:3000/",
      description: "Servidor Local",
    },
    {
      url: "http://192.168.0.237:3000/",
      description: "Servidor Douglas",
    },
  ],
  tags: [
    {
      name: "Usuarios",
      description:
        "Rotas para cadastro, login, atualização e desativação de usuários",
    },
    {
      name: "Categorias",
      description:
        "Rotas para cadastro, atualização,leitura e desativação de categorias",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {


    // USUÁRIOS

    "/usuarios": {
      post: {
        tags: ["Usuarios"],
        summary: "Cadastrar novo usuário",
        description: "Método utilizado para cadastrar novos usuários",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "email", "senha", "tipo_acesso"],
                properties: {
                  nome: { type: "string", example: "João Silva" },
                  email: { type: "string", example: "joao@example.com" },
                  senha: { type: "string", example: "123" },
                  tipo_acesso: { type: "string", example: "adm" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário cadastrado com sucesso",
          },
          400: {
            description: "Erro ao cadastrar usuário",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      get: {
        tags: ["Usuarios"],
        summary: "Listar todos os usuários",
        description:
          "Método utilizado para listar todos os usuários cadastrados",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de usuários",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id_usuario: { type: "integer", example: 1 },
                      nome: { type: "string", example: "João Silva" },
                      email: { type: "string", example: "joao@example.com" },
                      senha: { type: "string", example: "123" },
                      tipo_acesso: { type: "string", example: "adm" },
                      ativo: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/usuarios/{id_usuario}": {
      delete: {
        tags: ["Usuarios"],
        summary: "Desativar usuário",
        description: "Método utilizado para desativar um usuário",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Usuário desativado com sucesso",
          },
          400: {
            description: "Erro ao desativar usuário",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/usuarios/login": {
      post: {
        tags: ["Usuarios"],
        summary: "Login do usuário",
        description:
          "Método utilizado para efetuar o login do usuário e gerar o token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                  email: { type: "string", example: "sesia@sesi.br" },
                  senha: { type: "string", example: "123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example:
                          "jkdnaskjdbaskjndlaksnmmlmcaj21lekn1lkn213n12jb3kj 21",
                      },
                      id_usuario: { type: "integer", example: 1 },
                      nome: { type: "string", example: "João Silva" },
                      email: { type: "string", example: "joao@example.com" },
                      senha: { type: "string", example: "123" },
                      tipo_acesso: { type: "string", example: "adm" },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro ao encontrar usuário",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },


    // CATEGORIAS


    "/categorias": {
      post: {
        tags: ["Categorias"],
        summary: "Cadastrar nova categoria",
        description: "rota para cadastrar novas categorias",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "nome",
                  "tipo_transacao",
                  "gasto_fixo",
                  "id_usuario",
                  "icone",
                  "cor",
                ],
                properties: {
                  nome: { type: "string", example: "Alimentação" },
                  tipo_transacao: {
                    type: "string",
                    example: "ENTRADA OU SAIDA",
                  },
                  gasto_fixo: { type: "boolean", example: false },
                  id_usuario: { type: "integer", example: 1 },
                  icone: { type: "string", example: "save" },
                  cor: { type: "string", example: "#FFF" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Categoria cadastrada com sucesso",
          },
          400: {
            description: "Erro ao cadastrar categoria",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      get: {
        tags: ["Categorias"],
        summary: "Listar todos as categorias",
        description:
          "Método utilizado para listar todas as categorias cadastradas",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de categorias",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id_categoria: { type: "integer", example: 1 },
                      nome: { type: "string", example: "João Silva" },
                      tipo_transacao: { type: "string", example: "ENTRADA" },
                      gasto_fixo: { type: "boolean", example: true },
                      ativo: { type: "boolean", example: true },
                      id_usuario: { type: "integer", example: 2},
                      cor: { type: "string", example: '#fff'},
                      icone: { type: "string", example: "food"}
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/categorias/{id_categoria}": {
      delete: {
        tags: ["Categorias"],
        summary: "Desativar categoria",
        description: "Método utilizado para desativar uma categoria",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id_categoria",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 40,
            },
          },
        ],
        responses: {
          200: {
            description: "Categoria desativada com sucesso",
          },
          400: {
            description: "Erro ao desativar categoria",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },


    // SUBCATEGORIAS


    "/subcategorias": {
      post: {
        tags: ["Subcategorias"],
        summary: "Cadastrar nova subcategoria",
        description: "rota para cadastrar novas subcategorias",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "nome",
                  "id_categoria",
                  "gasto_fixo",
                  "ativo",
                  "icone",
                  "cor",
                ],
                properties: {
                  nome: { type: "string", example: "Alimentação" },
                  id_categoria: {
                    type: "integer",
                    example: "42",
                  },
                  gasto_fixo: { type: "boolean", example: false },
                  ativo: { type: "boolean", example: true },
                  icone: { type: "string", example: "save" },
                  cor: { type: "string", example: "#FFF" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Subcategoria cadastrada com sucesso",
          },
          400: {
            description: "Erro ao cadastrar subcategoria",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      get: {
        tags: ["Subcategorias"],
        summary: "Listar todos as subcategorias",
        description:
          "Método utilizado para listar todas as subcategorias cadastradas",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de subcategorias",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id_categoria: { type: "integer", example: 1 },
                      nome: { type: "string", example: "Subcategoria 1" },
                      gasto_fixo: { type: "boolean", example: true },
                      ativo: { type: "boolean", example: true },
                      cor: { type: "string", example: '#fff'},
                      icone: { type: "string", example: "food"}
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/subcategorias/{id_subcategoria}": {
      delete: {
        tags: ["Subcategorias"],
        summary: "Desativar subcategoria",
        description: "Método utilizado para desativar uma subcategoria",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id_subcategoria",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Subcategoria desativada com sucesso",
          },
          400: {
            description: "Erro ao desativar subcategoria",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
        
      },
    },
    
  },
  
};



const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;