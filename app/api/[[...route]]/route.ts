import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", (c) =>
  c.json({
    message: "Hello, World!",
  })
);

export const GET = handle(app);
export const POST = handle(app);
