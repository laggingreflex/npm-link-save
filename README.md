# npm-link-save

[![npm](https://img.shields.io/npm/v/npm-link-save.svg?style=flat-square)](https://www.npmjs.com/package/npm-link-save)


`npm link` with `--save` (or `--saveDev`) to save the linked dependency in your `package.json`.

You can also link **multiple** dependencies with this.

## Install

```
npm i -g npm-link-save
```

## Usage

```
npm-link-save express
# or
npm-link express
nls -D express     // links in devDependencies
nls express morgan // multiple links
```
