import { useState } from 'react';
import { predictEmotionApi } from '../api/emotion.api';

export const useEmotion = () => {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const detect = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await predictEmotionApi(text);
      setEmotion(result.emotion);  // adjust based on your Python API response shape
    } catch (error) {
      setEmotion(null);
    } finally {
      setLoading(false);
    }
  };

  return { emotion, loading, detect };
};