import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation with Swagger",
      version: "1.0.0",
      description:
        "Documentation generated with Swagger for the API of the project OneLink",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
