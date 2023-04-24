import path from "path";
import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyAutoload from "@fastify/autoload";
import fastifyStatic from "@fastify/static";
import pointOfView from "@fastify/view";
import handlebars from "handlebars";

const envSchema = {
  type: "object",
  required: ["SUPABASE_KEY", "SUPABASE_URL"],
  properties: {
    SUPABASE_KEY: {
      type: "string",
    },
    SUPABASE_URL: {
      type: "string",
    },
  },
};

const envOptions = {
  confKey: "config",
  schema: envSchema,
  dotenv: true,
  data: process.env,
};

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

const initialize = async () => {
  server.register(fastifyEnv, envOptions);
  await server.after();

  handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context, null, 2);
  });
  server.register(pointOfView, {
    engine: {
      handlebars: handlebars,
    },
  });

  server.register(fastifyStatic, {
    root: path.join(__dirname, "pages"),
    serve: false,
  });

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
  });

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
  });
};

initialize();

// Fire up the server
const listen = async () => {
  try {
    await server.ready();
    server.listen(
      { port: parseInt(process.env.PORT as string) || 8080 },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Server listening at ${address}`);
      }
    );
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

listen();
