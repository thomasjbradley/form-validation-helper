/**
 * @author Thomas J Bradley <https://thomasjbradley.ca>
 * @copyright © 2018–2020 Thomas J Bradley
 * @license MIT
 */
(function() {
  "use strict";

  const allForms = document.getElementsByTagName("form");

  const findParent = (elem, sel) => {
    if (elem.parentNode.matches("body")) return false;
    if (elem.parentNode.matches(sel)) return elem.parentNode;

    return findParent(elem.parentNode, sel);
  };

  const toggleElemValidity = (elem, isValid) => {
    if (!elem) return;

    elem.classList.add("is-validated");

    if (typeof isValid !== "undefined") {
      elem.dataset.state = isValid === false ? "invalid" : "valid";
    } else {
      if (elem.checkValidity() === false) {
        elem.dataset.state = "invalid";
      } else {
        elem.dataset.state = "valid";
      }
    }
  };

  const isOneOfManyValid = elem => {
    const allChecks = elem.querySelectorAll(
      '[type="checkbox"], [type="radio"]'
    );
    let isOneSelected = false;

    [].forEach.call(allChecks, input => {
      if (input.checked) isOneSelected = true;
    });

    return isOneSelected;
  };

  const validateForm = e => {
    const oneOfManyElems = e.target.querySelectorAll("fieldset.one-of-many");

    if (!e.target.checkValidity()) {
      e.preventDefault();
      toggleElemValidity(e.target);
      [].forEach.call(
        e.target.querySelectorAll("input, select, textarea"),
        ev => {
          toggleElemValidity(ev);
        }
      );
    }

    if (!oneOfManyElems) return;

    [].forEach.call(oneOfManyElems, checkGroup => {
      if (!isOneOfManyValid(checkGroup)) {
        e.preventDefault();
        toggleElemValidity(checkGroup, false);
      } else {
        toggleElemValidity(checkGroup, true);
      }
    });
  };

  [].forEach.call(allForms, form => {
    form.addEventListener("submit", validateForm);
  });

  if (allForms.length <= 0) {
    document.body.addEventListener("keyup", e => {
      let parentFieldset;

      if (e.keyCode != 13) return;

      if (["input", "select"].indexOf(e.target.tagName.toLowerCase()) > -1) {
        toggleElemValidity(e.target);

        if (e.target.getAttribute("type") === "radio") {
          toggleElemValidity(
            findParent(e.target, "fieldset"),
            e.target.checkValidity()
          );
        }

        if (e.target.getAttribute("type") === "checkbox") {
          parentFieldset = findParent(e.target, "fieldset");

          if (parentFieldset.classList.contains("one-of-many")) {
            toggleElemValidity(
              parentFieldset,
              isOneOfManyValid(parentFieldset)
            );
          }
        }
      }

      if (["textarea"].indexOf(e.target.tagName.toLowerCase()) > -1) {
        if (e.altKey || e.ctrlKey) toggleElemValidity(e.target);
      }
    });
  }
})();
