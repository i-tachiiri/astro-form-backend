import { OpenAPIRoute } from "chanfana";
import {
  PlaceAutoCompleteRequestSchema,
  PlaceAutoCompleteResponseSchema,
} from "../schemas/autocomplete.js";
import { jsonResponse } from "../lib/response.js";

export class AutoComplete extends OpenAPIRoute {
  schema = {
    request: {
      query: PlaceAutoCompleteRequestSchema,
    },
    responses: {
      200: {
        description: "Place autocomplete results",
        content: {
          "application/json": {
            schema: PlaceAutoCompleteResponseSchema,
          },
        },
      },
    },
  };

  async handle(c) {
    const { query } = (await this.getValidatedData()).query; // queryパラメータ取得

    const apiKey = c.env.GOOGLE_API_KEY;
    const endpoint = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    const url = `${endpoint}?input=${encodeURIComponent(query)}&key=${apiKey}&language=ja`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0", // ブラウザ相当のUAを追加
        },
      });
      const data = await res.json();
      if (!res.ok) {
        const message = data?.error_message || "Unknown error from Google API";
        return jsonResponse({ error: message }, 500);
      }

      const predictions = (data.predictions || []).map((p) => ({
        name: p.structured_formatting?.main_text ?? "",
        description: p.description,
        placeId: p.place_id,
      }));

      return jsonResponse({ results: predictions }, 200);
    } catch (err) {
      return jsonResponse({ error: "Failed to fetch autocomplete results" }, 500);
    }
  }
}
