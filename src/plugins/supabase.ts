import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import fastifyPlugin from "fastify-plugin";
import FastifySupabasePlugin from "fastify-supabase";

export default fastifyPlugin<SupabaseAuthClientOptions>(async function (fastify, _opts) {
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  // @ts-expect-error
  fastify.register(FastifySupabasePlugin, { supabaseKey, supabaseUrl });
});
