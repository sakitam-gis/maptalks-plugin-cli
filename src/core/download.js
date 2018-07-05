// from https://github.com/flipxfx/download-git-repo/blob/7f919760f1424697c72144d5008859eed5d92ad5/index.js

const downloadUrl = require('download');
const gitclone = require('git-clone');
const rm = require('rimraf').sync;

function normalize (repo) {
  let regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/;
  let match = regex.exec(repo);
  if (match) {
    const url = match[2];
    const checkout = match[3] || 'master';
    return {
      type: 'direct',
      url: url,
      checkout: checkout
    }
  } else {
    // eslint-disable-next-line
    regex = /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^\/]+)\/([^#]+)(?:#(.+))?$/;
    match = regex.exec(repo);
    const type = match[1] || 'github';
    let origin = match[2] || null;
    const owner = match[3];
    const name = match[4];
    const checkout = match[5] || 'master';
    if (origin == null) {
      if (type === 'github') {
        origin = 'github.com';
      } else if (type === 'gitlab') {
        origin = 'gitlab.com';
      } else if (type === 'bitbucket') {
        origin = 'bitbucket.com';
      }
    }
    return {
      type: type,
      origin: origin,
      owner: owner,
      name: name,
      checkout: checkout
    }
  }
}

function addProtocol (origin, clone) {
  if (!/^(f|ht)tps?:\/\//i.test(origin)) {
    if (clone) {
      origin = 'git@' + origin;
    } else {
      origin = 'https://' + origin;
    }
  }
  return origin;
}

function getUrl (repo, clone) {
  let url = '';
  // Get origin with protocol and add trailing slash or colon (for ssh)
  let origin = addProtocol(repo.origin, clone);
  // eslint-disable-next-line
  if (/^git\@/i.test(origin)) {
    origin = origin + ':';
  } else {
    origin = origin + '/';
  }
  // Build url
  if (clone) {
    url = origin + repo.owner + '/' + repo.name + '.git';
  } else {
    if (repo.type === 'github') {
      url = origin + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip';
    } else if (repo.type === 'gitlab') {
      url = origin + repo.owner + '/' + repo.name + '/repository/archive.zip?ref=' + repo.checkout;
    } else if (repo.type === 'bitbucket') {
      url = origin + repo.owner + '/' + repo.name + '/get/' + repo.checkout + '.zip';
    }
  }
  return url
}

module.exports = function download (repo, dest, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = null
  }
  opts = opts || {};
  const clone = opts.clone || false;
  repo = normalize(repo);
  let url = repo.url || getUrl(repo, clone);
  if (clone) {
    gitclone(url, dest, { shallow: repo.checkout === 'master' }, function (err) {
      if (err === undefined) {
        rm(dest + '/.git');
        fn()
      } else {
        fn(err)
      }
    })
  } else {
    downloadUrl(url, dest, { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
      .then(function (data) {
        fn()
      })
      .catch(function (err) {
        fn(err)
      })
  }
};
