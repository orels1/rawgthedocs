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

Most of the requests have an interactive widget to check out the responses. We do not save static JSONs as those might get outdated quick.

## Basics

API root is located at `https://rawg.io/api`

### Get games list

<ApiExample path="/games" pagination />

As you can see, if the endpoint returns a list - the response will always consist of at least the following properties

- `count` - the total amount of items in that particular database collection
- `next` - the url of the next page (if exists)
- `prev` - the url of the prev page (if exists)
- `results` - the list of items

More info on the `next` and `prev` below

## Pagination

All the routes that return multiple items have pagination support. You can see if the route supports pagination by the presence of the `page` and `page_size` query parameters in the documentation for a particular endpoint, see example above.

- `page` - the page to request the items for, based on the `page_size` (20 by default)
- `page_size` - the size of the page, 40 is the max value

The api will also return `next` and `prev` properties that point to the next and previous page, so you can save time on tracking the current page number utilizing those.

## Authentication

RAWG.io relies on a `token` header for authentication. To acquire a token - use the [/auth/login](/api/auth/#post-login) route. The returned key can then be used to authenticate all of the requests to the service.

When performing authenticated requests - your headers list should look like this

- `Content-Type`: `application/json`
- `token`: `Token <key from the api>`

There are no specific rotation or persistance rules, and the tokens seem to last a very long time, so it would seem you can safely use them with an assumption that they are permanent, prompting the user to re log in if the api suddenly returns a `401` status code.

::: warning
I haven't seen the token expire so far, but I'm certain it can be invalidated by the RAWG backend, so keep that in mind
:::

## API Clients

It's always nice to have an API client library to do the boring stuff for you, so here are the currently known libraries that wrap the RAWG.io API

- [rawgpy](https://pypi.org/project/rawgpy/) - a Python wrapper by [laundmo](https://github.com/laundmo)
- [rawger](https://npmjs.org/package/rawger) - a JS wrapper by [orels1](https://github.com/orels1) (creator of these docs)

If you are developing a library, please create an issue [in the docs repo](https://github.com/orels1/rawgthedocs) with a link to it. I will gladly add it!
