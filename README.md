# Serverless Greenhouse HR Connection

This function is deployed using the [Serverless framework](https://serverless.com/) to AWS Lambda. 

Because the v1 of Greenhouse's HR API needs to be proxied this function is the connection between the careers posted on Gatsbyjs.com and Gatsby's account on the Greenhouse portal.

## What it does

The function in `handler.js` forwards the data received from the Greenhouse Form component on .com on to Greenhouse's post applicant endpoint.

## Deploying

The whole function can be deployed after installing serverless globally with:

```sh
serverless deploy
```

The above command will deploy to a `dev` environment on Lambda. To deploy to `prod` use:

```sh
serverless deploy --stage prod
```

A successful deployment will return a message like this:

```
Service Information
service: greenhouse
stage: prod
region: us-east-1
stack: greenhouse-prod
resources: 17
api keys:
  None
endpoints:
  POST - https://a8wsdc02xk.execute-api.us-east-1.amazonaws.com/prod/postApplication
```

The endpoint is what is hit by .com to send the form data for an applicant to the function.

If you have made updates to the `serverless.yml` file you need to use the above commands, but if you want to deploy changes to a function, like the `postApplication` function in `handler.js`, you can run:

```sh
serverless deploy --stage prod --function postApplication
```

Which would be deployed to `prod` because of the `--stage` flag.

This function is currently deployed on Gatsby's AWS organization. You can find API access credentials to the organization for Dustin's user on 1Pass.

## Developing

The function can be invoked locally, and you can pass in mock data from a file like `data.json` with this command:

```sh
serverless invoke local --function postApplication --path data.json
```
