import { z } from "zod";
import { OpenAPIRoute } from "chanfana";

export class AutoComplete extends OpenAPIRoute {
  schema = {
    tags: ["Map"],
    summary: "Google Places Autocomplete を実行する",
    request: {
      query: z.object({
        query: z.string().min(1),
      }),
    },
    responses: {
      200: {
        description: "候補一覧",
        content: {
          "application/json": {
            schema: z.object({
              result: z.array(z.string()),
            }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { query } = (await this.getValidatedData<typeof this.schema>()).query;

    const apiKey = c.env.GOOGLE_API_KEY;
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const res = await fetch(`${endpoint}?input=${encodeURIComponent(query)}&key=${apiKey}&language=ja`);
    const data = await res.json() as PlacesAutocompleteResponse;
    if (!res.ok) {
      return c.json({ error: data.error_message ?? "Unknown error" }, 500);
    }

    const predictions = data.predictions?.map((p: any) => ({
      name: p.structured_formatting.main_text,
      description: p.description,
      placeId: p.place_id
    })) ?? [];
    

    return c.json({ results: predictions });
  }
}
type PlacesAutocompleteResponse = {
  status: string;
  error_message?: string;
  predictions: {
    description: string;
    place_id: string;
    reference: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
      main_text_matched_substrings?: {
        length: number;
        offset: number;
      }[];
      secondary_text_matched_substrings?: {
        length: number;
        offset: number;
      }[];
    };
    matched_substrings?: {
      length: number;
      offset: number;
    }[];
    terms?: {
      offset: number;
      value: string;
    }[];
    types?: string[];
  }[];
};
