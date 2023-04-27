const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const mondayServices = require('./mondayServices');
const axios = require('axios');
const {PandaDocument, CreatedBy, Template, Token, Field, AssignedTo, Pricing, PricingTable} = require("./PandaDocument");
//const Field = require("./Field");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Set up environment variables for your PandaDoc API key
const PANDADOC_API_KEY = "6833416302617ad09cc7643bbdca47400142dd65";

const document_id = 'k3BD4KQHi5N8MD2diVyDWf';

// Define the request headers
// const headers = {
//   'Authorization': `Bearer ${PANDADOC_API_KEY}`
// };

// Define the request parameters
const params = {
  limit: 1 // Change this to adjust the number of documents you want to retrieve
};



  /**
 * @openapi
 * /get-doc:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
  app.get('/get-doc', async (req, res) => {
    try {
     
      const response = await axios.get(PANDADOC_API_ENDPOINT, { headers, params });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
/**
 * @openapi
 * /monday-board:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

// GET endpoint
app.get("/monday-board", async (req, res) => {
    const mondayBoard = await mondayServices.fetchItems();
    const pandaDoc =  await mondayServices.getPandaDoc(PANDADOC_API_KEY, document_id);
    const document = new PandaDocument(pandaDoc);
    
    
    const field = 
;   // const field = [new Field(document.field) ];
    //const fieldResp = field(document.field);
    const dropdownField = field.find(x => x.type == "dropdown");
    
  res.send(mondayBoard);
});



/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
