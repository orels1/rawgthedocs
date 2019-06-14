# /auth

> Authentication / authorization related routes

## POST /login

> Login

### Description

Generates an auth token for the user

<ApiExample
method="POST"
path="/auth/login"
:body="[
  { label: 'email', value: '', placeholder: 'Email' },
  { label: 'password', value: '', placeholder: 'password' }
]"
/>
