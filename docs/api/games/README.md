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

## GET /:gameSlug/collections

> Collections with this game

### Description

Returns a page of collections this game is a part of

<ApiExample path="/games/:gameSlug/collections" pagination />

## PATCH /:gameSlug

> Edit the game data

### Description

Edits the game data by overwriting it with the provided data (make sure to base all edits of recently requested game data)

<ApiExample
method="PATCH"
path="/games/:gameSlug"
:body="[
  { label: 'name', value: '', placeholder: 'The current game name' },
  { label: 'description', value: '', placeholder: 'The current or new description' },
  { label: 'alternative_names', value: '', placeholder: 'List of names, [\'name1\', \'name2\']' },
  { label: 'platforms', value: '', placeholder: 'List of platform ids, [4, 5]' },
  { label: 'genres', value: '', placeholder: 'List of genres' },
  { label: 'publishers', value: '', placeholder: 'List of publishers' },
  { label: 'developers', value: '', placeholder: 'List of developers' },
  { label: 'website', value: '', placeholder: 'website url string' },
  { label: 'reddit_url', value: '', placeholder: 'reddit url string' },
  { label: 'tba', value: '', placeholder: 'True/False, whether the game is yet to be announced' },
  { label: 'released', value: '', placeholder: 'The date string of the release date, make sure its properly formatted' },
  { label: 'metacritic_url', value: '', placeholder: 'The url to metacritic, where the metacritic value is taken from' },
]"
/>
## GET /:gameSlug/screenshots

> Game screenshots

### Description

Returns a page of screenshots of this game

<ApiExample path="/games/:gameSlug/screenshots" 
  :query="[
    { label: 'with_deleted', value: '', placeholder: 'true/false, whether to include deleted screenshots' }
  ]"
  pagination />
