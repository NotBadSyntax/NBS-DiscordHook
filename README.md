# NBS Discord Webhook
(Forked from: https://github.com/Slimefun/discord-webhook)

This GitHub Action can produce fancy and more meaningful discord messages for your commits.
<br>It includes Test results and coverage.

## Inputs

### `id`
**Required** This is the id of your Discord webhook, if you copy the webhook url, this will be the first part of it.

### `token`
**Required** Now your Discord webhook token, it's the second part of the url.

## Example setup
To set up this Action, create a new workflow file under `.github/workflows/nbs-webhook.yml`.

```yaml
name: Discord Webhook

on: [push]

jobs:
  report-status:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v1
    - name: Run Discord Webhook
      uses: NotBadSyntax/NBS-DiscordHook@master
      with:
        id: ${{ secrets.YOUR_DISCORD_WEBHOOK_ID }}
        token: ${{ secrets.YOUR_DISCORD_WEBHOOK_TOKEN }}
```
