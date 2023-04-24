import type { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";

export default async function (fastify: FastifyInstance) {
  fastify.register(cookie);

  fastify.get("/discord", async function (request, reply) {
    const { url } = await fastify.supabase.auth.signIn(
      {
        provider: "discord",
      },
      { redirectTo: `${process.env.BASE_URL}/auth/callback` }
    );
    reply.redirect(url as string);
  });

  fastify.get("/callback", function (_request, reply) {
    reply.view("/src/pages/auth-callback.hbs");
  });

  fastify.post("/callback", async function (request, reply) {
    const token = request.body as any;
    for (const [key, value] of Object.entries(token)) {
      reply.setCookie(key, value as string, {
        httpOnly: true,
        secure: true,
      });
    }
  });

  fastify.get("/profile", function (request, reply) {
    const token = request.cookies;
    fastify.supabase.auth.api
      .getUser(token.access_token as string)
      .then((user) => {
        const data = {
          id: user.data?.id,
          avatar: user.data?.user_metadata.avatar_url,
          username: user.data?.user_metadata.name,
        };
        reply.view("/src/pages/profile.hbs", data);
      })
      .catch((err) => {
        console.log(err);
        reply.view("/src/pages/error.hbs", err);
      });
  });
}

