/*! Translatorjs - v0.0.1 - 2013-07-22
* https://github.com/alexaitken/translatorjs
* Copyright (c) 2013 Alex Aitken; Licensed MIT, GPL */

(function($) {
  'use strict';
  $.fn.translate = function() {
    if (this.attr('data-trans-key') !== undefined) {
      var params = this.data('trans-params');
      if (params === undefined) {
        params = [];
      } else {
        params = params.split(',');
      }
      var key = this.data('trans-key');
      this.text($.i18n._(key,params));
    }
  };

})(jQuery);
