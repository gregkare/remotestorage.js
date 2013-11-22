if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['requirejs', 'fs'], function(requirejs, fs, undefined) {
  var suites = [];

  suites.push({
    name: "Sync",
    desc: "Sync",
    setup: function(env, test) {
      global.RemoteStorage = function() {};
      RemoteStorage.log = function() {};
      require('./src/sync');

      test.done();
    },

    beforeEach: function(env, test) {
      env.rs = new RemoteStorage();
      test.done();
    },

    tests: [

      {
        desc: "Default value (won't work because we don't run rs_init here)",
        run: function(env, test) {
          test.assertAnd(env.rs.getSyncInterval(), 10000, "syncInterval was "+env.rs.getSyncInterval());
        }
      },

      {
        desc: "Update value",
        run: function(env, test) {
          env.rs.setSyncInterval(60000);
          test.assert(env.rs.getSyncInterval(), 60000);
        }
      },

      {
        desc: "#set a wrong value throws an error",
        run: function(env, test) {
          try {
            env.rs.setSyncInterval('60000');
            test.result(false, "setSyncInterval() didn't fail");
          } catch(e) {
            test.result(true);
          }
        }
      }
    ]
  });

  return suites;
});

