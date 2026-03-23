import { useState } from 'react';
import { createSessionApi } from '../api/session.api';
import { sendMessageApi } from '../api/chat.api';

export interface UiMessage {
  id: string;
  textUser: string;
  aiResponse: string;
  emotion: string | null;
  timestamp: Date;
}

export const useChat = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingText, setPendingText] = useState<string | null>(null);

  const startSession = async (title: string) => {
    const session = await createSessionApi(title);
    const id = (session as any)._id || session.id;
    setSessionId(id);
    return id;
  };

  const sendMessage = async (text: string) => {
    let currentSessionId = sessionId;

    // Auto-create session if none exists
    if (!currentSessionId) {
      currentSessionId = await startSession(text.slice(0, 30));
    }

    setPendingText(text);
    setLoading(true);
    setError(null);

    try {
      const result = await sendMessageApi(currentSessionId!, [{ text }]);

      // 10-second delay before showing the reply
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMessages(prev => [...prev, {
        id: result.id || Date.now().toString(),
        textUser: text,
        aiResponse: result.aiResponse,
        emotion: result.emotion ?? null,
        timestamp: new Date(result.timestamp),
      }]);

      return result;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setPendingText(null);
      setLoading(false);
    }
  };

  const reset = () => {
    setSessionId(null);
    setMessages([]);
    setError(null);
    setPendingText(null);
  };

  return { messages, loading, error, sendMessage, sessionId, pendingText, reset };
};