Package.describe({
  name: 'frozeman:simple-modal',
  summary: 'A simple modal to be triggered using a session variable',
  version: '0.0.6',
  git: 'http://github.com/frozeman/meteor-simple-modal'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  api.use('templating', 'client');
  api.use('session', 'client');

  api.use('frozeman:animation-helper@0.2.5', 'client');
  api.use('frozeman:template-var@1.0.5', 'client', {weak: true});

  api.addFiles('simple-modal.html', 'client');
  api.addFiles('simple-modal.css', 'client');
  api.addFiles('simple-modal.js', 'client');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('simple-modal');
//   api.addFiles('simple-modal-tests.js');
// });
