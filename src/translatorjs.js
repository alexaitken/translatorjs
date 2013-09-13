/*
 * translatorjs
 * https://github.com/alexaitken/translatorjs
 *
 * Copyright (c) 2012 Alex Aitken
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
  'use strict';
  function extractParams($element) {
    var params = $element.data('trans-params');
    if (params === undefined) {
      params = [];
    } else {
      params = params.split(',');
    }
    return params;
  }

  function translateElement() {
    var $element = $(this);
    $.each(translators, function(transKey, translator) {
      var dataKey = 'trans-' + transKey;
      var key = $element.data(dataKey);
      if (key !== undefined) {
        var params = extractParams($element);

        translator.call($element, key, params);
      }
    });
  }

  var translators = {
    'key': function(key, params) {
      this.text($.i18n._(key,params));
    },
    'formatter': function(key, params) {
      this.text($.i18n._(key).apply(this, params));
    }
  };

  $.fn.translate = function() {
    this.find('[data-trans-key]').add(this).each(translateElement);
  }
})(jQuery);
