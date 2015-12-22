// TODO: See if we should decouple the actual rule well enough that it can be run from both the command line and the
// node interface (test)
/**
 * DEPS
 */
var jscodeshift = require('jscodeshift');
var recast = require('recast');
var fs = require('fs');
var path = require('path');
var assert = require('assert');

/**
 * LOCAL DEPS
 */
var amdTransform = require('../../transforms/amd');

/**
 * TESTS
 *
 */
describe('AMD transform', function() {
  it('should convert define() { } -> ', function() {
    console.log(__dirname);
    var src = fs.readFileSync(path.resolve(__dirname, '../fixtures/amd.before.js')).toString();
    var expectedSrc = fs.readFileSync(path.resolve(__dirname, '../fixtures/amd.after.js')).toString();
    var result = amdTransform({ source: src }, { jscodeshift: jscodeshift });
    assert.equal(result, expectedSrc);
  });
});

/**
 * Converst the AST obj/tree and turns it into readable code.
 * Returns a string.
 *
 */
function toString(ast) {
  // force single quotes in the output...
  return recast.print(ast, {quote: 'single'}).code;

}
