/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('atom generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('atom:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'index.coffee',
      '.gitignore',
      'README.md',
      'package.json',
      'lib/awesome.coffee',
      'grammars/grammar.cson',
      'keymaps/keymap.cson',
      'stylesheets/style.css',
      'menus/application-menu.cson',
      'menus/context-menu.cson',
      'snippets/language.cson',
      'spec/fixtures/awesome_fixture.coffee',
      'spec/awesome_test.coffee'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'awesome',
      'ghname': 'hemanth',
      'features':['grammar','keymap','style','menu','snippet']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
