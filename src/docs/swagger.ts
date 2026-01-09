import swaggerJSDoc from "swagger-jsdoc";

/** @type {import("swagger-jsdoc").Options} */
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Câmbio",
      version: "1.0.0",
      description: "Documentação da API em exchange",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/server.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
