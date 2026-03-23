export interface Message {
  id: string;
  textUser: string;       // user's message
  aiResponse: string;     // AI reply
  emotion: string | null; // detected emotion
  timestamp: Date;
}

export interface Session {
  id: string;
  title: string;
  summary?: string;
  lastMessage: string | null;  // ← new field for chat history preview
  createdAt: string;
  updatedAt: string;
}

// A single message as stored in a session (from DB)
export interface SessionMessage {
  _id?: string;
  id?: string;
  textUser: string;
  aiResponse: string;
  emotion: string | null;
  timestamp: string;
}

export interface SessionWithMessages extends Session {
  messages: SessionMessage[];
}

export interface ChatHistoryItem {
  id: string;
  preview: string;  // first message preview
  date: string;
}

// What the chat API returns after sending a message
export interface SendMessageResponse {
  id: string;
  aiResponse: string;
  emotion: string | null;
  timestamp: Date;
}

// What you send to the chat API
export interface SendMessagePayload {
  sessionId: string;
  messages: { text: string }[];
}