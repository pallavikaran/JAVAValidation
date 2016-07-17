jQuery.print = function(value, insertionType) {
  function nestedRepresentation(value) {
    var output = '';
    var array = [];
    var index = 0;
    if (value && value.nodeName) {
      output += '&lt;' + value.nodeName.toLowerCase();
      output += value.className ? ' class="' + value.className + '"' : '';
      output += value.id ? ' id="' + value.id + '"' : '';
      output += '&gt;';
    }
    else if (value instanceof Array) {
      output += '[<blockquote>';
      array = [];
      for (var i = 0; i < value.length; i++) {
        array[i] = nestedRepresentation(value[i]);
      }
      output += array.join(',<br />') + '</blockquote>]';
    }
    else if (typeof(value) == 'object') {
      output += '{<blockquote>';
      array = [];
      index = 0;
      $.each(value, function(key, objValue) {
        array[index++] = nestedRepresentation(objValue);
      });
      output += array.join(',<br />') + '</blockquote>}';
    }
    else {
      output += value;
    }
    return output;
  }
  
  var message = nestedRepresentation(value);

  var $output = $('#print-output');
  
  if ($output.length === 0) {
    $output = $('<div id="print-output" />').appendTo('body');
  }
  
  var $newMessage = $('<div class="print-output-line" />');
  $newMessage.html(message);
  insertionType = insertionType || 'append';
  $output[insertionType]($newMessage);
};
$(document).ready(function() {
  var scriptUsed =  $.trim($('script:not([src]):first').html());
  scriptUsed = scriptUsed.replace(/\s+(\}\);)$/,'\n$1');
  $('body').prepend('<div class="container"><pre>' + scriptUsed  + '</pre></div>');
});
