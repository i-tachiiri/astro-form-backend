import { OpenAPIRoute } from "chanfana";
import {
  PlaceDetailRequestSchema,
  PlaceDetailResponseSchema,
} from "../schemas/detail.js";
import { jsonResponse } from "../lib/response.js";

export class Detail extends OpenAPIRoute {
  schema = {
    request: {
      body: {
        content: {
          "application/json": {
            schema: PlaceDetailRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Place detail result (name, latitude, longitude)",
        content: {
          "application/json": {
            schema: PlaceDetailResponseSchema,
          },
        },
      },
    },
  };

  async handle(c) {
    const { body } = await this.getValidatedData();
    const placeId = body.place_id;

    const apiKey = c.env.GOOGLE_API_KEY;
    const endpoint = "https://maps.googleapis.com/maps/api/place/details/json";
    const url = `${endpoint}?place_id=${encodeURIComponent(placeId)}&key=${apiKey}&language=ja`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });
      const data = await res.json();

      if (!res.ok || data.status !== "OK") {
        const message = data?.error_message || data?.status || "Unknown error";
        return jsonResponse({ error: message }, 500);
      }

      const result = data.result;
      const name = result.formatted_address ?? "";
      const latitude = result.geometry?.location?.lat ?? null;
      const longitude = result.geometry?.location?.lng ?? null;

      return jsonResponse({
        result: { name, latitude, longitude },
      }, 200);
    } catch (err) {
      return jsonResponse({ error: "Failed to fetch detail result" }, 500);
    }
  }
}
