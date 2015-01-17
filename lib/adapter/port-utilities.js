var blur, preventDefault;

blur = function(capsule) {
  if (capsule.type === 'link') {
    return capsule.event.target.blur();
  }
};

preventDefault = function(capsule) {
  if (capsule.event.preventDefault) {
    return capsule.event.preventDefault();
  }
};

module.exports = {
  blur: blur,
  preventDefault: preventDefault
};
