# myportfolio [![Build Status](https://travis-ci.org/toddmotto/fireshell.png)](https://yugoc89.worlders.co.uk)

## Scaffolding

````
├── app
│   ├── apple-touch-icon-precomposed.png
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── js
│   │   └── scripts.js
│   └── scss
│       ├── mixins
│       ├── modules
│       ├── partials
│       ├── vendor
│       └── style.scss
├── docs
├── grunt-build.command
├── grunt-build.bat
├── grunt-dev.command
├── grunt-dev.bat
├── package.json
├── README.md
├── .editorconfig
├── .gitignore
├── .jshintrc
└── .travis.yml
````

## Roadmap

Projected roadmap for FireShell and it's subsets builds.

* Integrate Grunt-init to allow for initial project naming (for dynamic CSS/JS banners)
* LESS.css variant (`less` dir inside `src`), keeping Sass as default but providing Gruntfile.js setup
* AngularJS FireShell build with MVC scaffolding
* Bower as package manager
* Static HTML Includes FireShell build (emulates server-side includes)
* PHP FireShell spawning a `localhost` with relevant includes
* Create a Yeoman generator for FireShell
* Add [grunt-autoprefixer](//github.com/nDmitry/grunt-autoprefixer) in place of `vendor` Sass mixin.
