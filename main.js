$(function () {

  var blinkOff = function (cursor) {
    cursor.removeClass('blink');
    cursor.children().first().removeClass('invisible').addClass('visible');
    setTimeout(function () { blinkOn(cursor); }, 500);
  }

  var blinkOn = function (cursor) {
    cursor.addClass('blink');
    cursor.children().first().removeClass('visible').addClass('invisible');
    setTimeout(function () { blinkOff(cursor); }, 500);
  }

  var cursor = $('#cursor');
  blinkOn(cursor);

  var timestamp = function () {
    return '[' + new Date().toLocaleTimeString() + ']';
  }

  $('#terminalInput').focus();
  $('.timestamp').html(timestamp());

  lineBreak = function (textField) {
    old_line = $('.line').last();
    new_line = old_line.clone();
    text = new_line.find('.textOutput');
    new_line.find('.timestamp').html(timestamp());
    text.html('');
    $('.container').append(new_line)
    new_cursor = old_line.find('#cursor').clone();
    $('.cursor').map(function () { $(this).remove(); });
    new_cursor.insertAfter(text);
    blinkOn(new_cursor);
    textField.value = '';
  }

  var space = function () {
    $('.textOutput').last().append('&nbsp;');
  }

  var changeDirectory = function () {
    $.post('/directories', {
      // do some ajaxy stuff
    }).done(function () {

    });
  }

  var listDirectory = function () {

  }

  KeyBindings = {
    13: lineBreak,
    32: space,
  }

  Commands = {
    'cd': changeDirectory,
    'ls': listDirectory,
  }

  $('#terminalInput').on('keyup', function (e) {
    callback = KeyBindings[e.keyCode];
    if (callback) { callback(this); } else { $('.textOutput').last().html(this.value); }
  });

  $(document).on('click', function () {
    $('#terminalInput').focus();
  })

});
