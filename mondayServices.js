const https = require("https");
const mondaySdk = require("monday-sdk-js");


const monday = mondaySdk();
monday.setToken(
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIxODM3MTMyOCwidWlkIjoyMjc3MzY1MSwiaWFkIjoiMjAyMy0wMS0wNlQxNzo1NjoxOC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTI2MzkxNSwicmduIjoidXNlMSJ9.sS7vKbd1nrFykINCBy_9WhSiRzG6UK9omVoVT-Rq41M"
);
//monday.setToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI1MDU4MjQyMCwidWlkIjo0MjA5MDczMSwiaWFkIjoiMjAyMy0wNC0xM1QxMzozODoxNS40ODlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY0OTQ5NzQsInJnbiI6ImV1YzEifQ.STk75iNR3a91uKb3o8EQueHdA3__Jidf4KL9mOabvMI");
//const BOARD_ID = 'https://devducks.monday.com/boards/1179258912';

const fetchItems = async () => {
  const query =
    "{boards(limit:1) { name id description items { name column_values{title id type text } } } }";

  const response = await monday.api(query);
  return response.data;
  //var re =  response.data.boards[0].items;
  //return response.data.boards[0].items;
};

async function getPandaDoc(authorizationHeader, document_id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `api.pandadoc.com`,
      path: `/public/v1/documents/${document_id}/details`,
      method: 'GET',
      headers: {
        Authorization: `API-Key ${authorizationHeader}`,
      },
    };
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        const parsedData = JSON.parse(responseData);
        resolve(parsedData);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

module.exports = { fetchItems, getPandaDoc };
