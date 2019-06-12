# Getting Started

## About RAWG api

First and foremost - please take a look at the [official RAWG.io api page](https://rawg.io/apidocs). There are some rules you have to follow. Some of the rules are listed below.

### Rules

**This is a rough interpretation of the rules, please take a look at [the official rules](https://rawg.io/apidocs) for more info**

- Identify your app with `User-Agent` header
- Don't dump the database
- Don't build RAWG clones
- Link to RAWG as your data source

## About the docs

This is a community-built project, so some of the info might be outdated or incomplete. We encourage everyone who notices an issue use a link at the bottom of the page to improve the documentation.

Docs are split by the root path, like `/games` or `/collections` for easier navigation. You should be able to find what you need pretty easily, but if you have any suggestions for the navigation setup, feel free to [create an issue with a suggestion](https://github.com/orels1/docs.rawg.io).

Most of the requests have an interactive widget to check out the responses. We do not save static JSONS as those might get outdated quick.

## Basics

API root is located at `https://rawg.io/api`

### Get games list

<ApiExample path="/games" />
