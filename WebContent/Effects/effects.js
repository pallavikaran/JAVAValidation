jQuery.print = function(message) {
  if (typeof(message) == 'object') {
    string = '{';
    $.each(message, function(key, value) {
      string += key + ': ' + value + ', ';
    });
    string += '}';
    message = string;
  }

  var $output = $('#print-output');
  
  if ($output.length == 0) {
    $output = $('<div id="print-output" />').appendTo('body');
  }
  
  $('<div class="print-output-line" />').text(message).appendTo($output);
};
