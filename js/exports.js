var AutoPostFocusMixin;

AutoPostFocusMixin = require('react-auto-post-focus-mixin');

module.exports = {
  Adapter: require('./adapter/exports'),
  Bridge: require('react-bridge'),
  Controller: require('./controller/exports'),
  Initializer: require('./initializer/exports'),
  Mixins: {
    AutoPostFocusMixin: AutoPostFocusMixin
  },
  Pando: require('pando'),
  React: require('react')
};
