import { apiClient } from "./client";
import { ENDPOINTS } from "./config";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  message: string;
  data: {
    response: string;
  };
};

export async function sendChatMessage(message: string, history: ChatMessage[]) {
  return apiClient<ChatResponse>(ENDPOINTS.TA_CHAT, {
    method: "POST",
    body: { message, history } as unknown as Record<string, unknown>,
  });
}
