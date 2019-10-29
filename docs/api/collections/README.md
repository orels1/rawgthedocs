# /collections

> Collection related routes, new collections

## GET /

> New collections

### Description

Returns new collections

<ApiExample path="/collections" pagination/>

## POST /

> Create a collection

### Description

::: tip
This is an authorized route. A `token` header is required
:::

Creates a new collection

<ApiExample
method="POST"
path="/collections/"
:body="[
  { label: 'name', value: 'Nice Games', placeholder: 'Name of the Collection' },
  { label: 'description', value: 'My collection of nice games', placeholder: 'Description for the Collection' }
]"
/>

## GET /:collectionSlug

> Collection data

### Description

Returns the collection data, without games
<ApiExample path="/collections/:collectionSlug"  />

## GET /:collectionSlug/feed

> Collection games

### Description

Returns the games in a collection

<ApiExample path="/collections/:collectionSlug/feed" pagination/>

## POST /:collectionSlug/games

> Add games to the collection

### Description

::: tip
This is an authorized route. A `token` header is required
:::

Adds multiple games to the collection

<ApiExample
method="POST"
path="/collections/:collectionSlug/games"
:body="[
  { label: 'games', value: [4200, 13537], placeholder: 'Array of game IDs' }
]"
/>

## GET /lists/popular

> Popular collections

### Description

Returns popular collections

<ApiExample path="/collections/lists/popular" pagination/>

## GET /lists/main

::: tip
Same as the [GET /lists/popular](#get-lists-popular) at the time of these docs being written
:::

### Description

Returns popular collections

<ApiExample path="/collections/lists/main" pagination/>

## PATCH /:collectionId

> Collection status update

### Description

Update a collection by ID for currently authorized user.
Returns the updated collection data (like [/:collectionSlug](#get-collectionSlug))

::: tip
This is an authorized route. A `token` header is required
:::

<ApiExample
method="PATCH"
path="/collections/:collectionId"
:body="[
  { label: 'name', value: '', placeholder: 'New name' },
  { label: 'description', value: '', placeholder: 'New description' }
]"
/>
