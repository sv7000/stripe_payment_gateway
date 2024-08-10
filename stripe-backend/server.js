require('dotenv').config();

const express = require("express");
const cors = require("cors")
const stripe = require('./config/stripeConfig');
const bodyParser = require('body-parser');
const app = express();

app.use(cors())
app.use(bodyParser.json())

const events = [];

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  

  try {
      const paymentIntent = await stripe.paymentIntents.create({
         amount,
          currency,
          automatic_payment_methods: { enabled: true },
      });

      res.send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/webhook', (req, res) => {
  const event = req.body;

  events.push(event);

  res.status(200).end();
});

app.get('/', (req, res) => {
   try {
      res.json("Routes are working")
   } catch (error) {
      res.json(error)
   }
})


app.listen(process.env.PORT,() => {
  console.log("Server connected successfully")
})