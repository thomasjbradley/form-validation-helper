(function () {
  'use strict';

  var allForms = document.getElementsByTagName('form');

  var validateForm = function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      this.classList.add('is-validated');
    }
  };

  [].forEach.call(allForms, function (form) {
    form.addEventListener('submit', validateForm);
  });
}());
