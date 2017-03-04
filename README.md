# Form validation helper

Helps prevent the `:invalid`/`:valid` styles from showing until after the form has been submitted.

Make sure to add `novalidate` to your `<form>` tag:

```html
<form class="max-length island" novalidate>
```

To style the `:invalid`/`:valid` states in CSS, prepend the selector with `.is-validated`, e.g.:

```js
.is-validated input:invalid {
  border-color: #f33;
}
```

---

## Usage

Include the `.js` file directly from the published GitHub Pages branch:

```js
<script src="https://thomasjbradley.github.io/form-validation-helper/index.js"></script>
```

---

License & copyright

© 2017 Thomas J Bradley
[Licensed under the MIT License](LICENSE)
