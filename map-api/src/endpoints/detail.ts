import { z } from "zod";
import { OpenAPIRoute } from "chanfana";

// スキーマ定義
const detailRequestSchema = z.object({
  place_id: z.string().min(1, "place_id は必須です"),
});

const detailResponseSchema = z.object({
  result: z.string(),
});

export class Detail extends OpenAPIRoute {
  schema = {
    tags: ["Map"],
    summary: "場所の詳細情報を取得する",
    request: {
      body: {
        content: {
          "application/json": {
            schema: detailRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "詳細情報の返却",
        content: {
          "application/json": {
            schema: detailResponseSchema,
          },
        },
      },
    },
  };

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const placeId = data.body.place_id;

    return {
      result: `${placeId} に関する詳細情報です`,
    };
  }
}
