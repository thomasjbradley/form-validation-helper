/**
 * @author Thomas J Bradley <https://thomasjbradley.ca>
 * @copyright © 2018 Thomas J Bradley
 * @license MIT
 */
(function () {
  'use strict';

  var allForms = document.getElementsByTagName('form');

  var toggleElemValidity = function (elem) {
    elem.classList.add('is-validated');

    if (!elem.checkValidity()) {
      elem.dataset.state = 'invalid';
    } else {
      elem.dataset.state = 'valid';
    }
  };

  var validateForm = function (e) {
    var oneOfManyElems = this.querySelectorAll('fieldset.one-of-many');

    if (!this.checkValidity()) {
      e.preventDefault();
      toggleElemValidity(e.target);
    }

    if (!oneOfManyElems) return;

    [].forEach.call(oneOfManyElems, function (checkGroup) {
      var isOneSelected = false;
      var allChecks = checkGroup.querySelectorAll('[type="checkbox"]');

      [].forEach.call(allChecks, function (checkbox) {
        if (checkbox.checked) isOneSelected = true;
      });

      if (!isOneSelected) {
        e.preventDefault();
        toggleElemValidity(e.target);
        checkGroup.dataset.state = 'invalid';
      }
    });
  };

  [].forEach.call(allForms, function (form) {
    form.addEventListener('submit', validateForm);
  });

  if (allForms.length <= 0) {
    document.body.addEventListener('keyup', function (e) {
      if (e.keyCode != 13) return;

      if (['input', 'select'].indexOf(e.target.tagName.toLowerCase()) > -1) {
        toggleElemValidity(e.target);
      }

      if (['textarea'].indexOf(e.target.tagName.toLowerCase()) > -1) {
        if (e.altKey || e.ctrlKey) toggleElemValidity(e.target);
      }
    });
  }
}());
