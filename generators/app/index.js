const Generator = require('yeoman-generator');
const yosay = require('yosay');
//
// This file is rather influenced by generator-webapp
//

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts); // Important; does setup
  }

  prompting() {
    const prompts = [
      //Empty for now as I don't have questions for users at this stage.
    ];
    return this.prompt(prompts); //returns a promise with answers.
  }

  writing() {
    this.log(yosay('Starting Generation!'));

    //Write out the basic structure.
    this._writingPackageJSON();
    this._writingGit();
    this._writingMain();
  }

  install() {
    this.installDependencies({bower: false});
  }

  end() {
    this.log(yosay('Done! Run "npm test" to verify the results'));
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {}
    );
  }
  _writingGit() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'));
  }
  _writingMain() {
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copy(
      this.templatePath('fixture.js'),
      this.destinationPath('tests/fixture.js')
    );
  }
}
