$('#ml-send-email').submit(function (event) {
  event.preventDefault();
  var $form = $(this);
  var data = $form.serialize();
  var url = $form.attr('action');
  $.post(url, data).done(notifySuccess).fail(notifyFailure);
});

function notifySuccess(data) {
  alert('Your email has been sent to: ' + data.email.to.join(', '));
}

function notifyFailure(error) {
  var message = error.message || 'Unknown error';
  alert('Email failed to send: ' + message);
}
