// -------------validation-----------------
  var constraints = {
    password: {
      presence: true,
      length: {
        minimum: 16
      }
    },
    comfirmpassword: {
      presence: true,
      equality: {
        attribute: "password",
        message:". The password does not match!"
      }
    },
    postcode: {
      format: {
        pattern: "\\d{4}",
        message: "Postcode must be 4 digits"
      },
    postcode1: {
      format: {
        pattern: "\\d{300}",
        message: "Postcode must be 300 characters"
    },
    postcode2: {
      format: {
        pattern: "\\d{3}",
        message: "Postcode must be 3 digits"
    },
    }
  }
  function handleFormSubmit(form, input) {
    var errors = validate(form, constraints);
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }
  function showErrors(form, errors) {
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }
  function showErrorsForInput(input, errors) {

    var formGroup = closestParent(input.parentNode, "form-group")
      , messages = formGroup.querySelector(".messages");
    resetFormGroup(formGroup);
    if (errors) {
      formGroup.classList.add("has-error");
      errors.forEach(function(error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }
  function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }
