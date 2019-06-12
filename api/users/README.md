# /users

## GET /:user

> User's profile

Returns user profile data

<ApiExample path="/users/orels1" />

### Path Parameters

- `user` - user slug to request the data for

## GET /:user/games

> User's games

### Description

Returns games for the selected user

<ApiExample path="/users/orels1/games" />

### Path Parameters

- `user` - user slug to request the data for

### Query Parameters

- `statuses` - filter for the game state
  - `playing`
  - `toplay`
  - `beaten`
  - `dropped`
  - `yet`
  - `owned`
- `page` - pagination parameter
- `page_size` - games per page

## GET /:user/favorites

> User's favorites games

### Description

Returns favorite games for the specified user

<ApiExample path="/users/orels1/favorites" />

### Path Parameters

- `user` - user slug to request the data for

## GET /:user/collections

> User's collections

### Description

Returns collections created by the specified user

<ApiExample path="/users/orels1/collections" />

### Path Parameters

- `user` - user slug to request the data for

### Query Parameters

- `page` - pagination parameter
- `page_size` - games per page

## GET /:user/reviews

> User's reviews

### Description

Returns revoews posted by the specified user

<ApiExample path="/users/orels1/reviews" />

### Path Parameters

- `user` - user slug to request the data for

### Query Parameters

- `is_text` - flag to only return the text reviews
- `page` - pagination parameter
- `page_size` - games per page
