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
                "text": "Arrival Estimates for: \"*fullerton*\""
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":red_circle: *Service toward Howard*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "DUE (Red)\n5 minutes (Red)\n15 minutes (Red)"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":red_circle: *Service toward 95th/Dan Ryan*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "8 minutes (Red)\n17 minutes (Red)"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":bear: *Service toward Kimball or Linden*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "4 minutes (Brown)\n15 minutes (Brown)"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":bear: *Service toward Loop*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "6 minutes (Brown)\n13 minutes (Brown)"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": ":stopwatch: Estimates generated at 08:21:26"
                }
            ]
        },
        {
            "type": "divider"
        }
    ]
}
```
which in Slack looks something like

<a href="https://cl.ly/d430990a9efd" target="_blank"><img src="https://d2y84jyh761mlc.cloudfront.net/items/222W0P353r1X3d0N3L2u/Image%202019-02-25%20at%208.28.24%20PM.png" style="display: block;height: auto;width: 100%;"/></a>

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
