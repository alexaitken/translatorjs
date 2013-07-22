(function($) {
  'use strict';

  describe("translatorjs", function() {
    it("makes no change to an element has no translate data attribute",function() {
      setFixtures("<div id='element'></div>");

      $("#element").translate();

      expect($("#element")).toHaveText('');
    });

    it("inserts translated text in the element that has a data-trans-key attribute", function() {
      setFixtures("<div id='element' data-trans-key='translate_me'></div>");
      sandbox.stub($.i18n, '_')
        .withArgs('translate_me')
        .returns('a translation');

      $("#element").translate();

      expect($("#element")).toHaveText('a translation');
    });

    describe("sprintf params defined in data-trans-params attribute", function() {
      it("pass no params when no params are defined ", function() {
        setFixtures("<div id='element' data-trans-key='translate_me'></div>");
        sandbox.stub($.i18n, '_')
          .withArgs('translate_me', [])
          .returns('a translation with no params');

        $("#element").translate();

        expect($("#element")).toHaveText('a translation with no params');
      });

      it("passes a single param when one is defined", function() {
        setFixtures("<div id='element' data-trans-key='translate_me' data-trans-params='param1'></div>");
        sandbox.stub($.i18n, '_')
          .withArgs('translate_me', ['param1'])
          .returns('a translation with a param');

        $("#element").translate();

        expect($("#element")).toHaveText('a translation with a param');
      });

      it("passes multiple params when many are defined", function() {
        setFixtures("<div id='element' data-trans-key='translate_me' data-trans-params='param1,param2,param3'></div>");
        sandbox.stub($.i18n, '_')
          .withArgs('translate_me', ['param1', 'param2', 'param3'])
          .returns('a translation with params');

        $("#element").translate();

        expect($("#element")).toHaveText('a translation with params');
      });
    });

    describe("formatter functions", function() {
      it("will call the formatter function with the given arguments", function() {
        setFixtures("<div id='element' data-trans-formatter='formatter' data-trans-params='param1,param2,param3'></div>");
        var formatter = sandbox.mock().withArgs('param1', 'param2', 'param3');
        sandbox.stub($.i18n, '_')
          .withArgs('formatter')
          .returns(formatter);

        $("#element").translate();
      });

      it("will place the output of formatter in the element", function() {
        setFixtures("<div id='element' data-trans-formatter='formatter' data-trans-params='param1,param2,param3'></div>");
        var formatter = sandbox.stub().returns('$10,100.00');
        sandbox.stub($.i18n, '_')
          .withArgs('formatter')
          .returns(formatter);

        $("#element").translate();

        expect($("#element")).toHaveText('$10,100.00');
      });
    });
  });
}(jQuery));
