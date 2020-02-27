<h1 align="center">
  bitbucket-push-to-discord
</h1>

## 🎉 Intro

Bitbucket and Discord webhooks cannot understand each other by default. You need to convert Bitbucket's webhook to a format that Discord can understand. A Google Cloud function can translate and forward push commits from Bitbucket to Discord.

I use this Bot as an internal tool to give team mates a way to keep up with code changes via Discord.

## 💼 Setting up Discord's Webhook
 1. Open Discord server > Pick a channel > Edit > Webhooks > Create Webhook
 2. Pick a name for your Discord bot
 3. Copy the webhook URL and paste it into `const discordEndpoint` inside `index.js`

## ‍💻 Setting up Google Cloud Functions
 1. Follow this [tutorial](https://cloud.google.com/functions/docs/quickstart-nodejs) to set up your Google Cloud account and the gcloud shell.
 2. Open Google Cloud SDK Shell
 3. deploy to the cloud:
    ```
    cd "~/REPO_PATH/bitbucket-push-to-discord"
    gcloud functions deploy bitbucketPushToDiscord --runtime=nodejs8 --trigger-http --memory=128MB --region=YOUR_REGION
    ```
 4. Google Cloud SDK will give you an URL endpoint. Copy and save this URL for the next step.

## 💼 Setting up Bitbucket's Webhook
 1. Navigate to the repository that you want to send notifications from.
 2. Settings > WebHooks > Add webhook
 3. Pick any name
 4. Paste the URL from your cloud function

## 🛠 Test your Bot
 - Make a random code change in your repository.
 - `git push`
 - If everything went alright your Discord bot shows a Commit message.

## 🎨 Style your Discord Bot Message
Optional: Use this [page](https://birdie0.github.io/discord-webhooks-guide/structure/embeds.html) as a guide on how to style your bot message to your liking.

## 📝 License

[MIT](https://github.com/storybookjs/storybook/blob/master/LICENSE)

-the end-
