# /games

> Games database related routes

## GET /

> All games

### Description

Returns all the games of rawg.io in the order of popularity, popular - first

::: warning
Dumping the DB is against the API rules, if you need large-volume exports for your use-case, ping `api@rawg.io` first ;)
:::

<ApiExample
  path="/games"
  :query="[
    { label: 'search', value: '', placeholder: 'A string to search for' }
  ]"
  pagination
/>

## GET /:gameSlug

> Game by slug

### Descirption

Returns a single game for the specified slug

<ApiExample path="/games/:gameSlug" />

## Get /:gameSlug/suggested

> Suggested games

### Descriptions

Returns suggested games for the base `gameSlug`, uses rawg's ai discovery system 🚀

<ApiExample path="/games/:gameSlug/suggested" pagination />
