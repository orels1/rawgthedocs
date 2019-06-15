# /collections

> collection related routes, new collections

## GET /

> New collections

### Descritption

Returns new collections

<ApiExample path="/collections" pagination/>


## GET /:collection

> Collection data

### Description

Returns the collection data, without games
<ApiExample path="/collections/:collection"  />

## GET /:collection/feed

> Collection games

### Description

Returns the games in a collection

<ApiExample path="/collections/:collection/feed" pagination/>


## POST /:collection/games

> Add games to the collection
### Description

::: tip
This is an authorized route. A `token` header is required
:::

Adds multiple games to the collection

<ApiExample
method="POST"
path="/collections/:collection/games"
:body="[
  { label: 'games': value: [1234, 12345], placeholder: 'Array of game IDs' }
]"
/>

## GET /lists/popular

> Popular collections

### Descritption

Returns popular collections

<ApiExample path="/collections/lists/popular" pagination/>

## GET /lists/main

> As fas as i could tell, same as popular

### Descritption

Returns popular collections

<ApiExample path="/collections/lists/main" pagination/>

## PATCH /:collectionId

> Collection status update

### Description

Update a collection by ID for currently authorized user.
Returns the updated collection data (like /:collection)

::: tip
This is an authorized route. A `token` header is required
:::

<ApiExample
method="PATCH"
path="/colections/:collectionId"
:body="[
  { label: 'name', value: '', placeholder: 'New name' },
  { label: 'description', value: '', placeholder: 'New description' }
]"
/>
