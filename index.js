const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add('Welcome to our chatbot!');
  }

  function fallback(agent) {
    agent.add('I didn\'t understand. Can you repeat that?');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);

  agent.handleRequest(intentMap);
});

app.listen(PORT, () => {
  console.log(`Chatbot is running on port ${PORT}`);
});
