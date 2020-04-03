# docsify-to-pdf

## Install

```sh
npm install --save-dev docsify-to-pdf
```

## Usage as CLI:

Create:

* config file `.docsifytopdfrc.<js|json|yaml>`
* or `"docsifytopdf"` field in `package.json` (like [rcfile][rcfile] can receive) with this setup object:

Example `.docsifytopdfrc.js` content:

```js
module.exports = {
  contents: [ "docs/_sidebar.md" ], // array of "table of contents" files path
  pathToPublic: "pdf/readme.pdf", // path where pdf will stored
  pdfOptions: "<options for puppeteer.pdf()>", // reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
  removeTemp: true, // remove generated .md and .html or not
  emulateMedia: "screen", // mediaType, emulating by puppeteer for rendering pdf, 'print' by default (reference: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageemulatemediamediatype)
}
```

Add script into `package.json`:

```json
{
  "scripts": {
    "convert": "node_modules/.bin/docsify-to-pdf"
  }
}
```

Run converter:

```sh
npm run convert
```

## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

Your pull requests and issues are welcome!

[rcfile]: https://www.npmjs.com/package/rcfile


Base on docsify-to-pdf
