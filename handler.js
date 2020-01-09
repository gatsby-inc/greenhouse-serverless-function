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
    'Authorization': `Basic ${b64EncodedToken}`,
  };
  console.log("Posting...")
  const response = await axios.post(
    `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/${jobId}`,
    {
      // "first_name": body["fist_name"],
      // "last_name": body["last_name"],
      // "email": body["email"],
      // "phone": body["phone"],
      ...body,
      "question_4029957003": "United States of America",
      "resume_content_filename": "resume.pdf",
    },
    {
      headers,
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
  console.log(response)
  console.log("Ending...")
  return response
};
