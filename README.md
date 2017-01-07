# npm-link-save

`npm-link` with `--save` (or `--saveDev`) to save the linked dependency in your `package.json`.

You can also link **multiple** dependencies with this.

## Install

```
npm i -g npm-link-save
```

## Usage

```
npm-link-save express
# or
npm-links express
npm-links -D express // links in devDependencies
npm-links express morgan // multiple links
```
