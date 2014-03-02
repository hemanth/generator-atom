'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AtomGenerator = module.exports = function AtomGenerator(args, options){
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AtomGenerator, yeoman.generators.NamedBase);

  AtomGenerator.prototype.askFor = function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Atom generator.'));

    var prompts = [{
      name: 'name',
      message: 'What would like name your atom package?',
      default: path.basename(process.cwd())
    },{
      name: 'description',
      message: 'Descirbe your package in one-line:',
      default: 'My awesome atom package!'
    },{
      name: 'license',
      message: 'What license would apply for this package?',
      default: 'MIT'
    },{
      name: 'ghname',
      message: 'What\'s your github username?',
    },{
      name: 'grammars',
      message: 'Are you using any grammars?',
      default: 'no'
    },{
      name: 'keymaps',
      message: 'Are you using keymaps?',
      default: 'no'
    },{
      name: 'menus',
      message: 'Are you adding menus?',
      default: 'no'
    },{
      name: 'snippets',
      message: 'Are you writing any snippets?',
      default: 'no'
    },{
      name: 'stylesheets',
      message: 'Are you doing some stylesheets?',
      default: 'no'
    }];

    this.currentYear = (new Date()).getFullYear();

    this.prompt(prompts, function (props) {
      this.slugname = this._.slugify(props.name);
      this.description = props.description;
      this.license = props.license;
      this.ghname = props.ghname;
      this.grammars = props.grammars;
      this.keymaps = props.keymaps;
      this.menus = props.menus;
      this.snippets = props.snippets;
      this.stylesheets = props.stylesheets;

      this.props = props;

      done();
    }.bind(this));


  };

  AtomGenerator.prototype.lib = function lib() {
    this.mkdir('lib');
    this.template('lib/name.coffee', 'lib/' + this.slugname + '.coffee');
  };

  AtomGenerator.prototype.grammars = function grammars() {
    if(this.grammars.toLowerCase() === "yes") {
      this.mkdir('grammars');
      this.template('grammars/grammar.cson','grammars/grammar.cson');
    }
  };

  AtomGenerator.prototype.keymaps = function keymaps() {
    if(this.keymaps.toLowerCase() === "yes") {
      this.mkdir('keymaps');
      this.template('keymaps/keymap.cson','keymaps/keymap.cson');
    }
  };

  AtomGenerator.prototype.stylesheets = function stylesheets() {
    if(this.stylesheets.toLowerCase() === "yes") {
      this.mkdir('stylesheets');
      this.template('stylesheets/style.css','stylesheets/style.css');
    }
  };

  AtomGenerator.prototype.menus = function menus() {
    if(this.menus.toLowerCase() === "yes") {
      this.mkdir('menus');
      this.template('menus/application-menu.cson','menus/application-menu.cson');
      this.template('menus/context-menu.cson','menus/context-menu.cson');
    }
  };

  AtomGenerator.prototype.snippets = function snippets() {
    if(this.snippets.toLowerCase() === "yes") {
      this.mkdir('snippets');
      this.template('snippets/language.cson','snippets/language.cson');
    }
  };

  AtomGenerator.prototype.test = function test() {
    this.mkdir('spec');
    this.mkdir('spec/fixtures')
    this.template('spec/test.coffee', 'spec/' + this.slugname + '_test.coffee');
    this.template('spec/fixtures/fixture.coffee', 'spec/fixtures/' + this.slugname + '_fixture.coffee');
  };

  AtomGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');
    this.template('README.md');
    this.template('_package.json', 'package.json');
    this.template('index.coffee', 'index.coffee')
  };

module.exports = AtomGenerator;
