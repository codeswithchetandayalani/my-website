// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route handler for POST /payment/success
app.post("/payment/success", (req, res) => {
  const formData = req.body; // Get form data from request body
  console.log("Form Data:", formData);
  try {
    // Extract relevant information from the request body
    const code = req.body.code;
    const merchantId = req.body.merchantId;
    const transactionId = req.body.transactionId;
    const amount = req.body.amount;
    const body = req.body;

    // Handle the payment success data as needed
    console.log("Payment success data full:", req.body); // whole payment data is available
    console.log("Payment success data:", {
      code,
      merchantId,
      transactionId,
      amount,
    }); // selected transaction data is available
    if (body) {
      // Send a response with redirect URL to the payment success page

      // orginal way to get data const redirectUrl = `http://localhost:4200/payment-success?code=${code}&merchantId=${merchantId}&transactionId=${transactionId}&amount=${amount}`;

      // custom data for payment details on the success page
      const redirectUrl = `http://localhost:3000/?transactionId=${transactionId}`;
      //   store the transaction details
      res.redirect(redirectUrl);
      // res.status(200).json({ success: true, message: "Payment success data received", redirectUrl });
    } else {
      // Log to console or handle the case where yourVariable is falsy
      console.error("Condition not met. Not redirecting.");
      res
        .status(200)
        .json({
          success: false,
          message: "Condition not met. Not redirecting.",
          body: req.body,
        });
    }
  } catch (error) {
    console.error("Error handling payment success:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
