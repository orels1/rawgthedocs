# /users

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