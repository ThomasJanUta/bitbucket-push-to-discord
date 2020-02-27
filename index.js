const request = require("request");

const botName = "bitbucket-commit-bot";
const discordEndpoint = "https://discordapp.com/api/webhooks/YOUR_WEBHOOK";
const messageColor = "80b3e2"; // discord blue

/**
 * @see https://stuart-jones.com/bitbot-a-bitbucket-push-bot-for-discord-and-slack/
 * @see https://birdie0.github.io/discord-webhooks-guide/structure/embeds.html
 * Use postman for testing the discord message: @see https://birdie0.github.io/discord-webhooks-guide/tools/postman.html
 */
exports.bitbucketPushToDiscord = (req, res) => {

  const push = {
    author: req.body.actor.display_name,
    repo: req.body.repository.name,
    branch: req.body.push.changes[0].new.name,
    // hash: req.body.push.changes[0].new.target.hash,
    commitMessage: req.body.push.changes[0].new.target.message,
    // link: req.body.push.changes[0].links.html.href,
  };

  const discordMessage = {
    "username": botName,
    "embeds": [{
      "title": push.commitMessage,
      "color": messageColor,
      "fields": [
        {
          "name": "Repository",
          "value": push.repo,
          "inline": true
        },
        {
          "name": "Branch",
          "value": push.branch,
          "inline": true
        },
        {
          "name": "Author",
          "value": push.author,
          "inline": true
        }
      ]
    }],
  };

  let requestError = null;
  let requestResponse = null;
  request({
    url: discordEndpoint,
    method: "POST",
    json: true,
    body: discordMessage,
  }, function (error, resp, body) {
    requestError = error;
    requestResponse = resp;
  });

  res.json(
    {
      status: "bitbucketPushToDiscord activated",
      discordMessage: discordMessage,
      requestResponse: requestResponse,
      requestError: requestError,
    },
  );
};