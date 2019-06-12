<h1 align="center">📖 rawgthedocs.orels.sh 📖</h1>
<p align="center">
  <strong>community-powered documentation for rawg.io</strong>
</p>

<p align="center">
  <sub>Built with ❤︎ by
  <a href="https://twitter.com/orels1_">orels1</a> and
  <a href="https://github.com/orels1/rawgthedocs/graphs/contributors">
    contributors
  </a>
</p>

## Contribution

The best way to contribute is to check out the current pages first, they are located in the `/docs/api` folder. If you want to update existing pages - it might be easier to just go to [the website](https://rawgthedocs.orels.sh) and click the "Edit this page!" link at the bottom to edit a particular page.

All contributions are welcome! No matter how big or small.

### ApiExample Component

The beating heart of this documentation system is the `ApiExample` vue component that allows you to quickly insert a demo widget for any api route you want and generate documentation for it.

The goal is to get rid of static jsons that get outdated quickly and provide those interested in the API with a simple way to explore the resources of rawg.io.

Main features of the component:

- Allows to quickly copy the urls
- Shows the responses with proper syntax highlighting
- Supports path paramaters and generates customizable fields for them
- Supports query paramaters and generates customizable fields for them
- Allows to pass extra documentation information for query params as placeholders
- Allows to toggle query paramaters on and off (useful for boolean params)

Any other info that you need to tell to the potential API user should just be written in plain Markdown below. As a huge proponent of simple systems, I'm certain that it's better than making even more fancy generators than there currently are.

#### Usage

You can insert `ApiExample` in any of the markdown files wherever you feel it should go. My general rule was to put it right below the basid description so far.

##### Generate example for `/api/games`

```md
<ApiExample path="/games" />
```

##### Generate example for `/api/users/<someUserSlug>/games`

This will add a path parameter `user` to the configurable params list and will prefill it with a default value.

```md
<ApiExample path="/users/:user/games" />
```

##### Generate example for a paginating route

This will add `page` and `page_size` to the query parameters list. This one was extracted to a boolean prop as it is used a lot.

```md
<ApiExample path="/users/:user/collections" pagination />
```

##### Generate example with custom query params

A lot of the API routes have some specific query parameters you can pass. In this case you will need to supply an array of those to the component. You can also combine the `query` prop with the `pagination` prop.

```md
<ApiExample
  path="/users/:user/reviews"
  :query="[
    { label: 'is_text', value: '', placeholder: 'Flag to only return reviews with text, value not required' }
  ]"
/>
```

Note that `:query` has a colon in front of it, it is very important to have it there, or vue would treat the query value as a string and not an array!

You can pass some default `value` to value if you want it there, but it would mean that user won't see the documentation part in the placeholder.

This component will probably get expanded down the line, as more documentation gets added. I will try to keep this readme up-to-date on that.
