# Chools - Twitter client

---

> A handy Twitter tool built with [TypeScript](https://www.typescriptlang.org/),
> [React](https://reactjs.org/), [Prettier](https://prettier.io/), [eslint](https://eslint.org/), and ❤️

## Motivations

Building a tool to help my wife search product feedbacks on Twitter.

## Features

The tools uses Twitter Standard API and allows to search and filter tweets, classify them by sentiments and categories, auto translate the ones written in foreign languages and save them in a Google Sheet.

The backend (https://github.com/gairal/chu-tools-server) uses 3 different RESTful endpoints built on Firebase Functions (gCloud functions) serverless architecture:

- /tweets => search for tweets
- /sheets => save tweets to a google sheet
- /translates => translate a string in English

The whole API is behind a google SSO authentication

![Screen Shot](/docs/screenshot.png)
