# C(E)TA

## Introduction
Slack API to facilitate using [Slash Commands](https://api.slack.com/slash-commands) for interacting with the Chicago Transportation Authority (CTA) [Train Tracker API](https://www.transitchicago.com/developers/traintracker/).

[View Deployment](https://ceta-slack-api.herokuapp.com/)

## Slack Usage
This API currently supports three parameters received from the slash command: station, line (optional), and direction (optional). Where direction is an enum (N, W, S, E). Each parameter must be separate by two forward slashes `//`. For example,
```
/ceta fullerton // red // N
```
or
```
/ceta fullerton // brown
```
or
```
/ceta fullerton
```
The resulting output is a JSON response that is formatted via Slack's newly introduced [Block Kit](https://api.slack.com/block-kit). For example,
```
/ceta fullerton // brown
```
would return something like
```json
{
    "response_type": "ephemeral",
    "text": "C(E)TA Arrival Estimates",
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "C(E)TA Arrival Estimates for: fullerton // brown"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":bear: *Brown Line*"
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": "*Loop* \n 7 minutes\n 16 minutes"
                },
                {
                    "type": "mrkdwn",
                    "text": "*Kimball* \n 10 minutes\n 17 minutes"
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": ":stopwatch: Estimates generated at 09:45:45"
                }
            ]
        }
    ]
}
```
which in Slack looks something like
<insert image>

## Local Development
To run this project locally, create a `secrets.js` file in the root directory with the following environment variables:
```js
process.env.CTA_TRAIN_TRACKER_API_URL = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx'
process.env.CTA_TRAIN_TRACKER_API_KEY = 'your key' // must be requested online @ https://www.transitchicago.com/developers/traintrackerapply/
process.env.SLACK_SIGNING_SECRET = 'your slack signing secret' // must create a Slack App first
process.env.CTA_TRAIN_STOP_API_URL = 'https://data.cityofchicago.org/resource/8mj8-j3c4.json'
process.env.CTA_TRAIN_STOP_API_TOKEN = 'your token' // must create an account and apply online @ https://data.cityofchicago.org/login

```
Then, run:
```js
yarn start-dev
```
