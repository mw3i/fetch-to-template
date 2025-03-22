---
title: Fetch to Template
---

# How it works

Import the javascript file, along with [Alpine.js](https://alpinejs.dev/) and [Nunjucks](https://mozilla.github.io/nunjucks/).

```html
<head>
    ...
    <script src="https://cdn.jsdelivr.net/npm/nunjucks@3.2.4/browser/nunjucks.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="fetch-to-template.js"></script>
</head>
```

Add the `x-fetch-to-template` attribute; specify the url and target (if target's left blank, defaults to the element with the `x-fetch-to-template` tag).

{% raw %}
```html
<div x-fetch-to-template="{ url: '/url/you/want/to/fetch/data/from', target_id: '#targetID' }">
...
</div>
```
{% endraw %}

And that's it. Then you just template like you normally would, using {{ data }} as the root name for the JSON data you pulled in. For example:

{% raw %}
```html
<div x-fetch-to-template="{ url: 'https://jsonplaceholder.typicode.com/users', target_id: '#someTemplate' }">
    <template id='someTemplate'>
        {% for user in data %}
        <p>\{\{user.name\}\} at \{\{user.email\}\} is with \{\{user.company.name\}\}</p>
        {% endfor %}
    </template>
</div>
```
{% endraw %}

or

{% raw %}
```html
<div x-fetch-to-template="{ url: 'https://jsonplaceholder.typicode.com/users' }">
    \{\% for user in data \%\}
    <p>\{\{user.name}} at \{\{user.email\}\} is with \{\{user.company.name\}\}</p>
    \{\% endfor \%\}
</div>
```
{% endraw %}

# Why it's awesome

- Separation of concerns: all front-end logic stays in the front-end html (the back-end api only has to worry about supplying the JSON data)
- Build the templating language directly into the html, exactly as your front-end users will see it.
- Extremely lightweight; doesn't depend on back-end build systems or site generators. Just a few javascript imports.
    - you don't have to deal with the learning curve of heavy weight frameworks
- Extremely fast and data-efficient; backend sends _just_ JSON, front-end templating handled by the users local machine.

# Where it gets wonky

- If you're using a different templating engine for site generation (e.g., liquid html), you have to ensure front-end templating and back-end templating don't conflict
    - This can be accomplished by switching the syntax for nunjucks from {% raw %}{{...}},{%...%}{% endraw %} -to-> [[...]],[%...%] (which nunjucks let's you do pretty easily)
