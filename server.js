const express = require("express");
const { errorHandler } = require("./middleware/errormiddle");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const http = require('http');
const cors = require("cors"); // import cors package


connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use( (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");
const swaggerJSDoc = require("swagger-jsdoc");

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API PROJECT for mongodb',
      version: '1.0.0'
    },
    servers: [{
      url:'http://localhost:5001'
    }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ["server.js","./routes/userRouter","./routes/noteRouter"],
}


const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *   get:
 *     summary: Test GET method
 *     description: Test if the GET method is working.
 *     responses:
 *       200:
 *         description: A simple message confirming that the GET method is working.
 */
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user by their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: chirag.mahida@scikey.ai
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: qqqqqq
 *     responses:
 *       '200':
 *         description: A JSON object containing the authenticated user's ID, email, and access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the authenticated user.
 *                   example: 63dca09e50666ad59ffeaa0b
 *                 email:
 *                   type: string
 *                   description: The email address of the authenticated user.
 *                   example: chirag.mahida@scikey.ai
 *                 token:
 *                   type: string
 *                   description: An access token for the authenticated user.
 *                   example: XXXXXXXXXXXXXXX
 *       '401':
 *         description: Invalid email or password.
 */

/**
 * @swagger
 * /users/verify:
 *   get:
 *     summary: Get verify token
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - verify
 *     responses:
 *       200:
 *         description: Returns id and name of user
 *       401:
 *         description: Unauthorized
 *     securityDefinitions:
 *       BearerAuth:
 *         type: apiKey
 *         name: Authorization
 *         in: header
 *         description: The JWT token, in the format 'Bearer &lt;token&gt;'
 *         value: Bearer {token}
 *         x-tokenName: Authorization
 *         x-tokenPrefix: Bearer
 *         x-tokenDescription: Enter the token in the format 'Bearer &lt;token&gt;'
 */



app.use("/users", userRouter);


//Project
/**
 * @swagger
 * /api/notes/project:
 *   get:
 *     summary: Get the all project name 
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - verify
 *     responses:
 *       200:
 *         description: Returns all project name 
 *       401:
 *         description: Unauthorized
 *     securityDefinitions:
 *       BearerAuth:
 *         type: apiKey
 *         name: Authorization
 *         in: header
 *         description: The JWT token, in the format 'Bearer &lt;token&gt;'
 *         value: Bearer {token}
 *         x-tokenName: Authorization
 *         x-tokenPrefix: Bearer
 *         x-tokenDescription: Enter the token in the format 'Bearer &lt;token&gt;'
 */
app.use("/api/notes", noteRouter);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);


app.listen(PORT, () => {
  console.log("server is running");
  // console.log(`Server is running on port ${PORT}`);
});