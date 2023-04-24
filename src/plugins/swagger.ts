import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin<FastifyDynamicSwaggerOptions>(async function (
  fastify,
  _opts
) {
  fastify.register(require("@fastify/swagger"), {});
  fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "My FirstAPP Documentation",
        description: "My FirstApp Backend Documentation description",
        version: "0.1.0",
      },
      host: "127.0.0.1:8080",
      basePath: "",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    uiConfig: {
      docExpansion: "list", // expand/not all the documentations none|list|full
      deepLinking: true,
    },
    staticCSP: false,
    exposeRoute: true,
  });
});
