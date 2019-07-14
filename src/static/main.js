var $form = $('#ml-send-email');

// Configure form validation

$.validator.addMethod('emails', function(value, element) {
  var segments = value.split(', ');
  for (var i = 0; i !== segments.length; ++i) {
    var segment = segments[i];
    var isValidEmail = $.validator.methods.email.call(this, segment, element);
    if (!isValidEmail) {
      return false;
    }
  }
  return true;
}, 'Please enter a comma-separated list of emails');

$.validator.addClassRules({
  emails: { emails: true }
});

$form.validate();

// Handle form submit

$form.submit(function (event) {
  event.preventDefault();
  if (!$form.valid()) {
    return;
  }
  var data = $form.serialize();
  var url = $form.attr('action');
  $.post(url, data).done(notifySuccess).fail(notifyFailure);
});

function notifySuccess(data) {
  alert('Your email has been sent to: ' + data.result.email.to.join(', '));
}

function notifyFailure(xhr) {
  // TODO Craft a nicer error message for the user.
  var message = (xhr.responseJSON.error || {}).message || 'Unknown error';
  alert('Email failed to send: ' + message);
}
