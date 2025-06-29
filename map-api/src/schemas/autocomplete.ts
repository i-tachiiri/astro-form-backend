import { z } from "zod";

// Autocomplete リクエストスキーマ（query パラメータ）
export const PlaceAutoCompleteRequestSchema = z.object({
  query: z.string().min(1, "検索クエリは必須です"),
});

// Autocomplete レスポンススキーマ
export const PlaceAutoCompleteResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      placeId: z.string(),
    })
  ),
});
