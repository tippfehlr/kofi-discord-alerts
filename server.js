/*
================================================================================
    MIT License

    Copyright (c) 2020 Nicholas S.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.


================================================================================


    For support, issues and more check my github here: https://github.com/EramsorGR/kofi-discord-alerts
    Support me on Ko-Fi here: https://ko-fi.com/eramsorgr 

    Please excuse junky or undocumented code!
    Made with <3 from Greece
*/

const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const { Webhook, MessageBuilder } = require("discord-webhook-node");

const webhook_link = process.env.WEBHOOK_LINK;
const port = Number(process.env.PORT) || 4852;

if (!webhook_link) {
  console.error("env variable WEBHOOK_LINK not set");
  process.exit(1);
}

const webhook = new Webhook(webhook_link);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async function (req, res) {
  const data = req.body.data;
  if (!data) return;

  try {
    const obj = JSON.parse(data);
    const embed = new MessageBuilder();
    embed.setTitle("New Ko-Fi Supporter!");
    embed.setColor(2730976);
    embed.addField(`From`, `${obj.from_name}`, true);
    embed.addField(`Amount`, `${obj.amount}`, true);
    embed.addField(`Message`, `${obj.message}`);
    embed.setTimestamp();
    await webhook.send(embed);
  } catch (err) {
    console.error(err);
    return res.json({ success: false, error: err });
  }
  return res.json({ success: true });
});

app.use("/", async function (req, res) {
  res.type("text/plain").send(`Send Ko-fi webhooks to /
Configure Ko-Fi webhooks here: https://ko-fi.com/manage/webhooks

Source code: https://github.com/tippfehlr/kofi-discord-alerts`);
  return;
});

const httpServer = http.createServer(app);
httpServer.listen(port, function () {
  console.log(`Ko-Fi Server online on port ${port}`);
});
