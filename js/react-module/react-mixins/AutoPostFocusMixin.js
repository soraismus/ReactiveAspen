/**
 * Derivative of source code copyrighted by Facebook.
 * The original source code is licensed under Facebook's BSD-style license.
 *
 * @providesModule AutoPostFocusMixin
 */

"use strict";

/**
 * @param {DOMElement} node input/textarea to focus
 */
function focusPostNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  } catch(e) {
  }
}

var AutoPostFocusMixin = {
  componentDidMount: function() {
    if (this.props.autoPostFocus) {
      focusPostNode(this.getDOMNode());
    }
  }
};

module.exports = AutoPostFocusMixin;
