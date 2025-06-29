import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { AutoComplete } from "./endpoints/autocomplete";
import { Detail } from "./endpoints/detail";

const app = new Hono();

app.use("*", cors());

const openapi = fromHono(app, {
  docs_url: "/", // Swagger UI 表示用
});

openapi.get("/endpoints/autocomplete", AutoComplete);
openapi.post("/endpoints/detail", Detail);

export default app;
