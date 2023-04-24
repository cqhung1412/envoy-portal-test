import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance, _opts: any) {
  fastify.get(
    "/",
    {
      schema: {
        description: "This is an endpoint for fetching all products",
        tags: ["products"],
        response: {
          200: {
            description: "Success Response",
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                category: { type: "string" },
                title: { type: "string" },
                price: { type: "number" },
              },
            },
          },
        },
      },
    },
    function serveHtml(_request, reply) {
      reply.view("/src/pages/homepage.hbs");
    }
  );

  fastify.setErrorHandler(function (error, _request, reply) {
    reply.view("/src/pages/error.hbs", error);
  });
}
