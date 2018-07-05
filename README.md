## maptalks-plugin-cli

> A scaffolding tool for rapid develop maptalks plugin。

[![Build Status](https://travis-ci.org/sakitam-gis/maptalks-plugin-cli.svg?branch=master)](https://www.travis-ci.org/sakitam-gis/maptalks-plugin-cli)
[![NPM downloads](https://img.shields.io/npm/dm/maptalks-plugin-cli.svg)](https://npmjs.org/package/maptalks-plugin-cli)
[![Npm package](https://img.shields.io/npm/v/maptalks-plugin-cli.svg)](https://www.npmjs.org/package/maptalks-plugin-cli)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/sakitam-gis/maptalks-plugin-cli/master/LICENSE)

## Quickstart

```bash
npm install -g maptalks-plugin-cli
# or
yarn global add maptalks-plugin-cli

// list available templete
maptalks list
// output usage information
maptalks list -h
// params: Template view under the specified warehouse
maptalks list -p maptalks-plugin-tpl
// output usage information
maptalks init -h
// generate project
maptalks init sakitam-gis/maptalks-plugin-tpl-base project
// Defaults associated repository `sakitam-gis`, so, you can use
maptalks init maptalks-plugin-tpl-base project
// Use cached template
maptalks init --offline maptalks-plugin-tpl-base project
cd project
npm i
npm run dev
```

## You can also use [sakitam-cli](https://github.com/sakitam-fdd/sakitam-cli)

```bash
sakitam list -u sakitam-gis -p maptalks-plugin-tpl // list templetes

// init
sakitam init sakitam-gis/maptalks-plugin-tpl-official project // user/repo
sakitam init --offline maptalks-plugin-tpl-official project // Use cached template
sakitam init -c direct:https://github.com/sakitam-gis/maptalks-plugin-tpl-official.git project // Use git clone ~ direct is important
```

## example

```bash
maptalks list // list templetes

// init
maptalks init maptalks-plugin-tpl-official project // repo
maptalks init sakitam-gis/maptalks-plugin-tpl-official project // user/repo
maptalks init --offline maptalks-plugin-tpl-official project // Use cached template
maptalks init -c direct:https://github.com/sakitam-gis/maptalks-plugin-tpl-official.git project // Use git clone ~ direct is important
```

## Development

```bash
git clone https://github.com/sakitam-gis/maptalks-plugin-cli.git
cd maptalks-cli
npm link
maptalks -h
```
