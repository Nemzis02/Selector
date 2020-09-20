# Selector

This project developed for achieving a roadmap aims.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

You need to have installed Node.js version 10.16.0 or above.

For windows:

[Download](https://nodejs.org/download/release/v10.16.0/node-v10.16.0-x64.msi) Node.js installer from the node site and setup.

Alternatives:

* Using [Chocolatey](https://chocolatey.org/):

```
cinst nodejs --version 10.16.0
```

* Using [Scoop](https://scoop.sh/):

```
scoop install nodejs@10.16.0
```

For macOS:

[Download](https://nodejs.org/download/release/v10.16.0/node-v10.16.0.pkg) Node.js installer from the node site and setup.

Alternatives:

* Download the package with bash:

```
curl "https://nodejs.org/dist/latest/node-${10.16.0:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

* Using [Homebrew](https://brew.sh/):

```
brew install node 10.16.0
```

### Installing

Clone the repository to your local machine

```
git clone https://github.com/Nemzis02/Selector.git
```

Install packages

```
npm install
```

Run the application on your localhost

```
npm start
```

After successful the steps finishing the application will be running on [http://localhost:3000](http://localhost:3000): Open your browser and check it out.


## Running the test

For running test execute next command

```
npm run test
```

## Components documentation

The Documentation already generated, and available by path ***/docs/index.html***. If there is any updates, the documentation can be updated by running the next command

```
npm run docs
```

## Built With

* [React](https://reactjs.org/) web framework
* [Material-ui styling](https://material-ui.com/ru/styles/basics/) hook
* [Create React App](https://create-react-app.dev/docs/getting-started/) fast bootstrap react project util
* [Enzyme](https://enzymejs.github.io/enzyme/) react components testing library
* [JSDoc](https://jsdoc.app/) and [Better-docs](https://www.npmjs.com/package/better-docs) documentation tools

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/Nemzis02/Selector/releases). 

## Authors

* [**Kirill Yerin** ](https://github.com/Nemzis02)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used