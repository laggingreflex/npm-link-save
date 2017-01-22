#!/usr/bin/env node

const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path')

const cwd = process.cwd()

let args = process.argv.slice(2);

let cwdPkgJson = require(path.join(cwd, 'package.json'));
let dependencies = 'dependencies'
args = args.filter(arg => {
  if (['--save-dev', '-D', '--saveDev'].indexOf(arg) > 0) {
    dependencies = 'devDependencies';
    return false
  }
  return true;
})
cwdPkgJson[dependencies] = cwdPkgJson[dependencies] || {};

let ctr = 0;


args.forEach(pkg => {
  spawn('npm', ['link', pkg], { stdio: 'inherit', shell: true, cwd }).once('exit', code => {
    if (code !== 0) return done();
    const linkedPkgJson = require(pkg + '/package.json');
    cwdPkgJson[dependencies][linkedPkgJson.name] = '^' + linkedPkgJson.version;
    done();
  })
})

function done() {
  if (++ctr < args.length) return;
  cwdPkgJson[dependencies] = sort(cwdPkgJson[dependencies])
  fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(cwdPkgJson, null, 2));
}

function sort(obj) {
  const sorted = {}
  const keys = Object.keys(obj).sort();
  keys.forEach(k => sorted[k] = obj[k]);
  return sorted;
}
