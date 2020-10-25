
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

//app.use(cors());
app.use(bodyParser.json());

let welcomeMessage = [
  {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
 {
  id: 1,
  from: "jeff",
  text: "Hello world",
},
{
  id: 2,
  from: "John Snow",
  text: "Winter is coming!",
},
{
  id: 3,
  from: "Arnold",
  text: "I'll be BACK",
},
{
    id: 4,
    from: "stallone",
    text: "get up rocky",
  },
  {
    id: 5,
    from: "Alfy",
    text: "have a nice day",
  }

]

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//Last 10 messages ----change 10 to lesser number to test
app.get('/messages/latest', (req, res) => {
   res.json(welcomeMessage.slice(1).slice(-10));
})
//Display homepage
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//Post a new message
app.post('/messages', (req, res) => {
    let myMessage = req.body;
    if(Object.keys(myMessage).length === 0){
      res.json({status: "400"});
    }
    myMessage?(welcomeMessage.push(myMessage),res.json(welcomeMessage)) : res.send({success: false});
    console.log(welcomeMessage);
  })

//See all messages
app.get('/messages', (req, res) => {
  res.json(welcomeMessage);
  console.log(welcomeMessage);
});

//Getting a weird error ...works with "cyf" but not with other words / returns results from only the first element 
app.get('/messages/search', (req, res) => {
  let termQ = req.query.term;

  welcomeMessage.filter((e, i) => {
    e.text.toLowerCase().includes(termQ) ? res.json(e.text) : res.json({success: false});
  })
 
  
})
//Retrieve by ID
app.get('/messages/:id', (req, res) => {
  const {id} = req.params;
  const filteredMessage =  welcomeMessage.find(e => e.id == id);
  res.json(filteredMessage);
  console.log(filteredMessage);

})



//Delete a message
app.delete('/messages/:id', (req, res) => {
  const {id} = req.params;
  welcomeMessage = welcomeMessage.filter((e) => e.id != id);
  id <= welcomeMessage.length ? (res.json(welcomeMessage),console.log(welcomeMessage)) : res.json({success: false}); 
})




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});