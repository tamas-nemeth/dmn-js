import inherits from 'inherits-browser';

import NavigatedViewer from './NavigatedViewer';

import AlignElementsModule from 'diagram-js/lib/features/align-elements';
import AutoPlaceModule from './features/auto-place';
import AutoScrollModule from 'diagram-js/lib/features/auto-scroll';
import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import ContextPadModule from './features/context-pad';
import ConnectPreviewModule from 'diagram-js/lib/features/connection-preview';
import DefinitionPropertiesModule from './features/definition-properties/modeler';
import DistributeElementsModule from './features/distribute-elements';
import EditorActionsModule from './features/editor-actions';
import GenerateDiModule from './features/generate-di';
import GridSnappingModule from 'diagram-js/lib/features/grid-snapping';
import KeyboardModule from './features/keyboard';
import KeyboardMoveModule from 'diagram-js/lib/navigation/keyboard-move';
import KeyboardMoveSelectionModule from 'diagram-js/lib/features/keyboard-move-selection';
import LabelEditingModule from './features/label-editing';
import ModelingModule from './features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import PaletteModule from './features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import SnappingModule from './features/snapping';

/**
 * A modeler for DMN tables.
 *
 *
 * ## Extending the Modeler
 *
 * In order to extend the viewer pass extension modules to bootstrap via the
 * `additionalModules` option. An extension module is an object that exposes
 * named services.
 *
 * The following example depicts the integration of a simple
 * logging component that integrates with interaction events:
 *
 *
 * ```javascript
 *
 * // logging component
 * function InteractionLogger(eventBus) {
 *   eventBus.on('element.hover', function(event) {
 *     console.log()
 *   })
 * }
 *
 * InteractionLogger.$inject = [ 'eventBus' ]; // minification save
 *
 * // extension module
 * var extensionModule = {
 *   __init__: [ 'interactionLogger' ],
 *   interactionLogger: [ 'type', InteractionLogger ]
 * };
 *
 * // extend the viewer
 * var dmnModeler = new Modeler({ additionalModules: [ extensionModule ] });
 * dmnModeler.importXML(...);
 * ```
 *
 *
 * ## Customizing / Replacing Components
 *
 * You can replace individual table components by redefining them in override modules.
 * This works for all components, including those defined in the core.
 *
 * Pass in override modules via the `options.additionalModules` flag like this:
 *
 * ```javascript
 * function CustomContextPadProvider(contextPad) {
 *
 *   contextPad.registerProvider(this);
 *
 *   this.getContextPadEntries = function(element) {
 *     // no entries, effectively disable the context pad
 *     return {};
 *   };
 * }
 *
 * CustomContextPadProvider.$inject = [ 'contextPad' ];
 *
 * var overrideModule = {
 *   contextPadProvider: [ 'type', CustomContextPadProvider ]
 * };
 *
 * var dmnModeler = new Modeler({ additionalModules: [ overrideModule ]});
 * ```
 *
 * @param {Object} [options] configuration options to pass to the viewer
 * @param {DOMElement} [options.container]
 *        the container to render the viewer in, defaults to body.
 * @param {string|number} [options.width] the width of the viewer
 * @param {string|number} [options.height] the height of the viewer
 * @param {Object} [options.moddleExtensions]
 *        extension packages to provide
 * @param {Array<didi.Module>} [options.modules]
 *        a list of modules to override the default modules
 * @param {Array<didi.Module>} [options.additionalModules]
 *        a list of modules to use with the default modules
 */
export default function Modeler(options) {
  NavigatedViewer.call(this, options);
}

inherits(Modeler, NavigatedViewer);


// modules the modeler is composed of
//
// - viewer + navigation modules
// - modeling modules

Modeler.prototype._modelingModules = [

  // modeling components
  AlignElementsModule,
  AutoPlaceModule,
  AutoScrollModule,
  BendpointsModule,
  ContextPadModule,
  ConnectPreviewModule,
  DefinitionPropertiesModule,
  DistributeElementsModule,
  EditorActionsModule,
  GenerateDiModule,
  GridSnappingModule,
  KeyboardModule,
  KeyboardMoveModule,
  KeyboardMoveSelectionModule,
  LabelEditingModule,
  ModelingModule,
  MoveModule,
  PaletteModule,
  ResizeModule,
  SnappingModule
];

Modeler.prototype._modules = [].concat(
  Modeler.prototype._modules,
  Modeler.prototype._modelingModules
);
