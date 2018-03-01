# Form validation helper

Helps prevent the `:invalid`/`:valid` styles from showing until after the form has been submitted.

---

## Usage

The setup is fairly simple, a few small HTML tweaks and you’ll be ready to style your error messages.

**1. Add `novalidate` to your `<form>` tag:**

```html
<form novalidate>
```

**2. Include the `.js` file** directly from the published GitHub Pages branch:

```js
<script src="https://thomasjbradley.github.io/form-validation-helper/index.js"></script>
```

**3. Style the `:invalid`/`:valid` states in CSS**—prepend the selectors with `.is-validated`, e.g.:

```css
.is-validated input:invalid {
  border-color: #f33;
}
```

Also the `data-state="invalid"` attribute will be added to the `<form>` tag when it hasn’t passed validation. (`data-state="valid"` when it has passed validation.)

```html
<form novalidate class="is-validated" data-state="invalid">
```

If there is no `<form>` tag, only field tags, the `data-state="invalid"` attribute & `.is-validated` class will be added directly to the `<input>` itself. So, the CSS would change a little, like this:

```css
.is-validated input:invalid,
input.is-validated:invalid {
  border-color: #f33;
}
```

### One-of-many checkbox groups

It’s pretty common to have a group of checkboxes and want users to select at least one of them. HTML cannot do this by itself.

To get basic checkbox group validation add the class `one-of-many` to the surrounding `<fieldset>`:

```html
<fieldset class="one-of-many">
  <legend>Select all that apply</legend>
  <!-- All the checkboxes in here -->
</fieldset>
```

When a checkbox hasn’t been selected the `<fieldset>` will receive a `data-state` attribute of `invalid`:

```html
<fieldset class="one-of-many" data-state="invalid">
```

We can use the `.one-of-many[data-state="invalid"]` selector to show the appropriate error message to our users.

Similarly, when there isn’t a `<form>` this will also apply to groups of radio buttons inside a `<fieldset>`.

---

## License & copyright

© 2018 Thomas J Bradley
<br>[Licensed under the MIT License](LICENSE)
