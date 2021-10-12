import {
  debounce
} from 'min-dash';

var DEBOUNCE_DELAY = 300;

import {
  domify,
  classes as domClasses,
  query as domQuery
} from 'min-dom';

import {
  getBusinessObject
} from 'dmn-js-shared/lib/util/ModelUtil';

import {
  validateId
} from 'dmn-js-shared/src/util/IdsUtil';


export default function DefinitionIdEdit(eventBus, modeling, canvas) {
  this._eventBus = eventBus;
  this._modeling = modeling;
  this._canvas = canvas;

  eventBus.on('definitionIdView.create', function(event) {
    this._container = event.html;
    var nameElement = domQuery('.dmn-definitions-name', this._container),
        idElement = domQuery('.dmn-definitions-id', this._container);

    this._setup(nameElement, 'name');
    this._setup(idElement, 'id');
  }, this);
}

DefinitionIdEdit.$inject = [
  'eventBus',
  'modeling',
  'canvas'
];


DefinitionIdEdit.prototype.update = function(type, newValue) {
  var element = this._canvas.getRootElement();
  var newProperties = {};
  newProperties[type] = newValue;

  if (type === 'id') {
    var validationHint = validateId(getBusinessObject(element), newValue);

    if (validationHint) {
      addErrorMessage(this._container, validationHint);
      return;
    }

    clearErrorMessage(this._container);
  }

  this._modeling.updateProperties(element, newProperties);
};

DefinitionIdEdit.prototype._setup = function(node, type) {
  var self = this;

  node.setAttribute('contenteditable', true);

  node.addEventListener('input', debounce(function(evt) {
    var value = evt.target.value || evt.target.textContent;

    self.update(type, value.trim());
  }, DEBOUNCE_DELAY));

  node.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 13) {
      node.blur();
      window.getSelection().removeAllRanges();
    }
  });

  node.addEventListener('blur', function(evt) {
    clearErrorMessage(self._container);

    self._eventBus.fire('definitionIdEdit.blur', {
      html: evt.target
    });
  });

};


/* helper */

function addErrorMessage(container, errorMessage) {
  const errorHTML =
    '<span class="dmn-definitions-error-label">' +
    `${errorMessage}` +
    '</span>';

  var idElement = domQuery('.dmn-definitions-id', container);

  // clear existing validation messages
  clearErrorMessage(container);

  // add current validation messages
  domClasses(idElement).add('dmn-definitions-error');
  idElement.parentElement.appendChild(domify(errorHTML));
}

function clearErrorMessage(container) {
  var idElement = domQuery('.dmn-definitions-id', container);

  if (domClasses(idElement).has('dmn-definitions-error')) {
    domClasses(idElement).remove('dmn-definitions-error');

    const errorLabel = domQuery('.dmn-definitions-error-label', container);
    idElement.parentNode.removeChild(errorLabel);
  }
}
