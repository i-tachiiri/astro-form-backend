import { fromHono } from "chanfana";
import { Hono } from "hono";
import { AutoComplete } from "./endpoints/autocomplete";
import { Detail } from "./endpoints/detail";


// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/endpoints/autocomplete", AutoComplete);
openapi.get("/endpoints/detail", Detail);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
