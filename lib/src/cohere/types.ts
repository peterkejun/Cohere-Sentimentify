import { classifyResponse } from "cohere-ai/dist/models";

export type Classification = classifyResponse['classifications'][number];
export type Classifications = Classification[];
