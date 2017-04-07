/*!
 * © 2017 Thomas J Bradley
 * https://thomasjbradley.ca
 * MIT License
 */
(function () {
  'use strict';

  var allForms = document.getElementsByTagName('form');

  var validateForm = function (e) {
    var oneOfManyElems = this.querySelectorAll('fieldset.one-of-many');

    if (!this.checkValidity()) {
      e.preventDefault();
      e.target.classList.add('is-validated');
      e.target.dataset.state = 'invalid';
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
        e.target.classList.add('is-validated');
        e.target.dataset.state = 'invalid';
        checkGroup.dataset.state = 'invalid';
      }
    });
  };

  [].forEach.call(allForms, function (form) {
    form.addEventListener('submit', validateForm);
  });
}());
