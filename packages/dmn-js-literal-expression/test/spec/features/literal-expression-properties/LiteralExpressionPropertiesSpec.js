import { bootstrapViewer } from 'test/helper';

import { query as domQuery } from 'min-dom';

import TestContainer from 'mocha-test-container-support';

import literalExpressionXML from '../../literal-expression.dmn';

import CoreModule from 'src/core';
import LiteralExpressionPropertiesModule
  from 'src/features/literal-expression-properties';
import TranslateModule from 'diagram-js/lib/i18n/translate';


describe('literal expression properties', function() {

  beforeEach(bootstrapViewer(literalExpressionXML, {
    modules: [
      CoreModule,
      TranslateModule,
      LiteralExpressionPropertiesModule
    ]
  }));

  let testContainer;

  beforeEach(function() {
    testContainer = TestContainer.get(this);
  });


  it('should render', function() {

    // then
    expect(domQuery('.literal-expression-properties', testContainer)).to.exist;
  });

});