/**
 * @author Thomas J Bradley <https://thomasjbradley.ca>
 * @copyright © 2018 Thomas J Bradley
 * @license MIT
 */
(function () {
  'use strict';

  var allForms = document.getElementsByTagName('form');

  var findParent = function (elem, sel) {
    if (elem.parentNode.matches('body')) return false;
    if (elem.parentNode.matches(sel)) return elem.parentNode;

    return findParent(elem.parentNode, sel);
  };

  var toggleElemValidity = function (elem, isValid) {
    if (!elem) return;

    elem.classList.add('is-validated');

    if (typeof isValid !== 'undefined') {
      elem.dataset.state = (isValid === false) ? 'invalid' : 'valid';
    } else {
      if (elem.checkValidity() === false) {
        elem.dataset.state = 'invalid';
      } else {
        elem.dataset.state = 'valid';
      }
    }
  };

  var isOneOfManyValid = function (elem) {
    var isOneSelected = false;
    var allChecks = elem.querySelectorAll('[type="checkbox"], [type="radio"]');

    [].forEach.call(allChecks, function (input) {
      if (input.checked) isOneSelected = true;
    });

    return isOneSelected;
  };

  var validateForm = function (e) {
    var oneOfManyElems = this.querySelectorAll('fieldset.one-of-many');

    if (!this.checkValidity()) {
      e.preventDefault();
      toggleElemValidity(e.target);
    }

    if (!oneOfManyElems) return;

    [].forEach.call(oneOfManyElems, function (checkGroup) {
      if (!isOneOfManyValid(checkGroup)) {
        e.preventDefault();
        toggleElemValidity(checkGroup, false);
      } else {
        toggleElemValidity(checkGroup, true);
      }
    });
  };

  [].forEach.call(allForms, function (form) {
    form.addEventListener('submit', validateForm);
  });

  if (allForms.length <= 0) {
    document.body.addEventListener('keyup', function (e) {
      var parentFieldset;

      if (e.keyCode != 13) return;

      if (['input', 'select'].indexOf(e.target.tagName.toLowerCase()) > -1) {
        toggleElemValidity(e.target);

        if(e.target.getAttribute('type') === 'radio') {
          toggleElemValidity(findParent(e.target, 'fieldset'), e.target.checkValidity());
        }

        if(e.target.getAttribute('type') === 'checkbox') {
          parentFieldset = findParent(e.target, 'fieldset');

          if (parentFieldset.classList.contains('one-of-many')) {
            toggleElemValidity(parentFieldset, isOneOfManyValid(parentFieldset));
          }
        }
      }

      if (['textarea'].indexOf(e.target.tagName.toLowerCase()) > -1) {
        if (e.altKey || e.ctrlKey) toggleElemValidity(e.target);
      }
    });
  }
}());
