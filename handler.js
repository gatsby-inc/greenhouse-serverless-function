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
  console.log("///////////// BODY //////////////////")
  console.log(body)
  console.log("///////////// BODY //////////////////")
  console.log(jobId)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  };
  console.log("Posting...")
  const response = await axios.post(
    `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/${jobId}`,
    {
      ...body,
    },
    {
      headers: {
        ...headers,
        'Authorization': `Basic ${b64EncodedToken}`,
      },
    }
  )
  .then(result => {
    console.log("-------result----------")
    console.log(result)
    console.log("-------result----------")
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: 'Application posted successfully',
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
        error: error.message,
        message: 'Application failed to post',
      }),
    }
  })  
  console.log(response)
  console.log("Ending...")
  return response
};
