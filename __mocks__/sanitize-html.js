// Manual Jest mock for `sanitize-html`.
//
// The real package pulls in an ESM-only dependency chain (htmlparser2 and
// friends) that Jest's CommonJS-based test runtime can't execute, even
// though it works fine at build/runtime through Next.js's own bundler. None
// of the tests in this project exercise HTML sanitization itself, so a
// passthrough stub avoids fighting that dependency chain in the test
// environment. See BaixarPostsDoBlogger.test.ts.
module.exports = function sanitizeHtml(dirty) {
  return dirty;
};
