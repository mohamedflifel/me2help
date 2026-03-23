const connectDb = require("./src/config/connect.js");
const validateEnv = require("./src/config/env.js");

const app = require("./src/app.js");
const PORT = process.env.PORT || 5000;


validateEnv();

app.get('/', (req, res) => {
    res.send('Server node works,fine!');
});

connectDb()
  .then(() => {
    app.listen(PORT, 
      () => {
        console.log(`Server node is running on port ${PORT} : http://127.0.0.1:${PORT}`);
        console.log(`Server python is running on ${process.env.PYTHON_API}`);
      }
    );
  }).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the application with an error code
    
  });
