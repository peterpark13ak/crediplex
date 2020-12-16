const express   = require('express')
const router    = express.Router()
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("be0a4868-b0b9-47b1-a115-3a8d1fba3850");

module.exports = (req,res)=>{
    client.sendEmail({
        "From": 'raul@ladr.io',
        "To": "raul@ladr.io",
        "Subject": `Crediplex Contact Form :: ${req.body.subject}`,
        "TextBody": `
                    Message Received
                    
                    Name:${req.body.name} 
                    Email:${req.body.email}
                    Subject: ${req.body.subject}
                    Message: ${req.body.message}`
      });
} 
