define([], function() {
  return {
    defineMocks: function(env) {
      global.Blob = function(input, options) {
        this.input = input;
        this.options = options;
        env.blob = this;
      };

      global.FileReader = function() {};
      global.FileReader.prototype = {
        _events: {
          loadend: []
        },
        addEventListener: function(eventName, handler) {
          this._events[eventName].push(handler);
        },
        readAsArrayBuffer: function(blob) {
          setTimeout(function() {
            this.result = env.fileReaderResult = Math.random();
            this._events.loadend[0]();
          }.bind(this), 0);
        }
      };
    }
  };
});
