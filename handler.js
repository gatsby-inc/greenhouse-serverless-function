'use strict';
const axios = require('axios')

const boardToken = `gatsby`
const b64EncodedToken = Buffer.from(process.env.GATSBY_GREENHOUSE_KEY).toString('base64')

module.exports.postApplication = async (event, context) => {
  let body;
  let jobId;
  if (event.body) {
    body = JSON.parse(event.body);
    jobId = body.jobId
  }
  console.log(jobId)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    'Authorization': `Basic ${b64EncodedToken}`,
  };
  console.log("Posting...")
  await axios
  .post(
    `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/4006211003`,
    // `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/${jobId}`,
    {
      "first_name": "Testy",
      "last_name": "Turner",
      "email": "kyle.gill+test@gatsbyjs.com",
      "phone": "3337778888",
      "location": "110 5th Ave New York, NY, 10011",
      "latitude": "40.7376671",
      "longitude": "-73.9929196",
      "resume_text": "I have many years of experience as an expert basket weaver...",
      "cover_letter_text": "I have a very particular set of skills, skills I have acquired over a very long career. Skills that make me..."
    },
    {
      headers,
    }
  )
  .then(result => {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: 'JazzHR Application posted successfully',
      }),
    };
  })
  .catch(error => {
    console.log("---START ERROR---")
    console.log(error)
    console.log("---END ERROR---")
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        error,
        message: 'JazzHR Application failed to post',
      }),
    }
  })  
  console.log("Ending...")
};
