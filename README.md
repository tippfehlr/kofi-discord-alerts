# Ko-Fi Discord Alerts Server

A simple NodeJS server to accept requests from Ko-Fi Webhook service and translate them into a Discord embed!

## Installation with docker compose

```yaml
version: "3" # deprecated in very recent docker compose versions
services:
  kofi-discord-alerts:
    image: ghcr.io/tippfehlr/kofi-discord-alerts
    restart: unless-stopped
    environment:
      - "WEBHOOK_LINK=your-webhook"
    ports:
      - 4852:4852
```

