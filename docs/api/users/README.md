# /users

::: tip
You can supply `current` in place of user slug to get data for the currently authorized user

Requires authorization, duh
:::

## GET /:user

> User's profile

Returns user profile data

<ApiExample path="/users/:user" />

## GET /:user/games

> User's games

### Description

Returns games for the selected user

<ApiExample
  path="/users/:user/games"
  :query="[
    { label: 'statuses', value: '', placeholder: 'Filter for the game state' }
  ]"
  pagination
/>

#### Status options

Statuses enum can have the following values

- `playing`
- `toplay`
- `beated`
- `dropped`
- `yet`
- `owned`

## GET /:user/favorites

> User's favorites games

### Description

Returns favorite games for the specified user

<ApiExample path="/users/:user/favorites" pagination />

## GET /:user/collections

> User's collections

### Description

Returns collections created by the specified user

<ApiExample path="/users/:user/collections" pagination />

## GET /:user/reviews

> User's reviews

### Description

Returns revoews posted by the specified user

<ApiExample
 path="/users/:user/reviews"
 :query="[
   { label: 'is_text', value: '', placeholder: 'Flag to only return reviews with text, value not required' }
 ]"
 pagination
/>

## PATCH /current/games/:id

> Game status update

### Description

Update a game by ID for currently authorized user

::: tip
This is an authorized route. A `token` header is required
:::

<ApiExample
method="PATCH"
path="/users/current/games/:id"
:body="[
  { label: 'status', value: '', placeholder: 'Status to assign' }
]"
/>

#### Status options

Statuses enum can have the following values

- `playing`
- `toplay`
- `beated`
- `dropped`
- `yet`
- `owned`
