import { SensibleOptions } from "@fastify/sensible";
import fastifyPlugin from "fastify-plugin";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fastifyPlugin<SensibleOptions>(async function (fastify, opts) {
  fastify.register(require("@fastify/sensible"), {
    errorHandler: true,
  });
});
