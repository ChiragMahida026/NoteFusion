const express = require("express");
const { errorHandler } = require("./middleware/errormiddle");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const http = require('http');
const cors = require("cors"); 


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
      title: 'NodeFusion API Documentation',
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
 *     tags: 
 *       - Test
 *     responses:
 *       200:
 *         description: A simple message confirming that the GET method is working.
 */
app.get('/', (req, res) => {
  res.send('Welcome to the NoteFusion Api Documentation!');
});


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user by their email and password.
 *     tags: 
 *       - Login
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
 *       - Verify
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


//get the notes
/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get the all project name 
 *     parameters:
 *      - name: "service_id"
 *        in: "query"
 *        description: "service id"
 *        required: true
 *        type: "string"
 *      - name: "project_name"
 *        in: "query"
 *        description: "Project Name"
 *        required: true
 *        type: "string"
 *      - name: "environment_type"
 *        in: "query"
 *        description: "Environment Type"
 *        required: true
 *        type: "string"
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - Notes
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

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Add a new note
 *     description: Create a new note with details about a project's service
 *     tags: 
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Command:
 *                 type: string
 *                 description: The command used to start the service.
 *                 example: pm2/nohup
 *               Port:
 *                 type: string
 *                 description: The port number on which the service is running.
 *                 example: 3008
 *               Type:
 *                 type: string
 *                 description: The type of the service.
 *                 example: Node
 *               environment:
 *                 type: string
 *                 description: The environment in which the service is running.
 *                 example: nut-dev, devint
 *               environment_type:
 *                 type: string
 *                 description: The type of environment in which the service is running.
 *                 example: dev
 *               project_id:
 *                 type: string
 *                 description: The ID of the project to which the service belongs.
 *                 example: 63e477418ac7508eaf6c469d
 *               project_name:
 *                 type: string
 *                 description: The name of the project to which the service belongs.
 *                 example: Pure
 *               service_id:
 *                 type: string
 *                 description: The ID of the service.
 *                 example: 63dca09e50666ad59ffeaa0b
 *               servicename:
 *                 type: string
 *                 description: The name of the service.
 *                 example: qwerty
 *     responses:
 *       '200':
 *         description: A JSON object containing the ID of the created note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created note.
 *                   example: 1234567890abcdefg
 *       '401':
 *         description: Invalid credentials.
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get all project names
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all project names
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
/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update the name and project name of a note by ID
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to update
 *         example: 64216d247fa6d674ab9ad579
 *         required: true
 *         schema:
 *           type: string
 *       - name: note
 *         in: body
 *         description: Fields to update in the note
 *         required: true
 *         schema:
 *           type: object
 *           properties:
  *               Command:
 *                 type: string
 *                 description: The command used to start the service.
 *                 example: pm2/nohup
 *               Port:
 *                 type: string
 *                 description: The port number on which the service is running.
 *                 example: 3008
 *               Type:
 *                 type: string
 *                 description: The type of the service.
 *                 example: Node
 *               environment:
 *                 type: string
 *                 description: The environment in which the service is running.
 *                 example: nut-dev, devint
 *               environment_type:
 *                 type: string
 *                 description: The type of environment in which the service is running.
 *                 example: dev
 *               project_id:
 *                 type: string
 *                 description: The ID of the project to which the service belongs.
 *                 example: 63e477418ac7508eaf6c469d
 *               project_name:
 *                 type: string
 *                 description: The name of the project to which the service belongs.
 *                 example: Pure
 *               service_id:
 *                 type: string
 *                 description: The ID of the service.
 *                 example: 63dca09e50666ad59ffeaa0b
 *               servicename:
 *                 type: string
 *                 description: The name of the service.
 *                 example: qwerty
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
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


/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Get all project names
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all project names
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





//Project get
/**
 * @swagger
 * /api/notes/project:
 *   get:
 *     summary: Get the all project name 
 *     security:
 *       - BearerAuth: []
 *     tags: 
 *       - Project
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




//project post
/**
 * @swagger
 * /api/notes/project:
 *   post:
 *     summary: Add a new note
 *     description: Create a new note with details about a project's service
 *     tags: 
 *       - Project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *                 description: The command used to start the service.
 *                 example: pure2
 *     responses:
 *       '200':
 *         description: A JSON object containing the ID of the created note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created note.
 *                   example: 1234567890abcdefg
 *       '401':
 *         description: Invalid credentials.
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
});
