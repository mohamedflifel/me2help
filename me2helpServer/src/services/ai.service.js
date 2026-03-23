// ← AI response based on detected emotion

const getAIResponse = async (messages, emotion) => {
  switch (emotion) {
    case 'joy':
      return "Your happiness is radiant today 🌟 Take a moment to savour this feeling — write down what sparked this joy so you can return to it whenever you need a lift.";

    case 'sadness':
      return "It's okay to feel sad — every emotion has something to teach us 🌧️ Be gentle with yourself today. What is your heart trying to tell you right now?";

    case 'anger':
      return "Your feelings are valid 🔥 Anger often signals that something important to you has been crossed. Take a breath and ask yourself: what boundary needs to be honoured?";

    case 'fear':
      return "Courage isn't the absence of fear — it's moving forward despite it 🌿 What is one small step you could take today to feel a little safer?";

    case 'surprise':
      return "Life just handed you something unexpected ✨ Whether good or unsettling, surprises invite us to stay present. What did this moment reveal about you?";

    case 'disgust':
      return "Something feels misaligned with your values today 🍃 Your discomfort is a compass. What does this reaction tell you about what truly matters to you?";

    case 'neutral':
      return "A calm mind is a powerful mind 🌙 Sometimes stillness is exactly what we need. Use this quiet moment to reflect — what intention would you like to set for today?";

    default:
      return "Thank you for sharing your thoughts 💙 Every word you write here is a step toward understanding yourself better. Keep going — you are doing great.";
  }
};

module.exports = getAIResponse;