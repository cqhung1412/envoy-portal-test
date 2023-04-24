// add helmet middleware using fastify.addHook
// src/plugins/helmet.ts
import fastifyPlugin from "fastify-plugin";
import helmet from "@fastify/helmet";

export default fastifyPlugin(async function (fastify, _opts) {
  fastify.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });
});
