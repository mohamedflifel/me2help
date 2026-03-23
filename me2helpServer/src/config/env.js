// ← validate required env vars
const validateEnv = () => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variable: ${key}`);
    }
  });
};

module.exports = validateEnv;