import { z } from "zod";

export const PlaceDetailRequestSchema = z.object({
  place_id: z.string().min(1, "place_id は必須です"),
});

export const PlaceDetailResponseSchema = z.object({
  result: z.object({
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
});