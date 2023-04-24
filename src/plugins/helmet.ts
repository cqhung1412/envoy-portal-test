import fastifyPlugin from "fastify-plugin";
import helmet, { FastifyHelmetOptions } from "@fastify/helmet";

export default fastifyPlugin<FastifyHelmetOptions>(async function (
  fastify,
  _opts
) {
  fastify.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });
});
