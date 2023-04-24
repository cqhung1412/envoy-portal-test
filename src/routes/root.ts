import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance, _opts: any) {
  fastify.get("/", function serveHtml(_request, reply) {
    reply.view("/src/pages/homepage.hbs");
  });

  fastify.setErrorHandler(function (error, _request, reply) {
    reply.view("/src/pages/error.hbs", error);
  });
}
