import Ember from 'ember';
import {
    convertToArray,
    convertStringToArray,
    convertObjectKeysToArray,
    doArraysIntersect
} from '../utils/utils';

/**
 * @module
 */

/**
 * Test whether value(s) are contained in other values.
 *
 * Value(s) to test for can be a single value or an array of values.
 * All values must be present in the values being tested or the test will fail
 *
 * @function contains
 * @param {ember/Application} [app]
 * @param {Array|String|Object} underTest
 * @param {Array|String|Object} testFor
 * @throws {ember.assert} If parameters are not an array, string, or object
 * @returns {Boolean}
 */
export default function() {
    let index = ( 3 === arguments.length ) ? 1 : 0;
    let underTest = arguments[ index ];
    let testFor = arguments[ index + 1 ];

    Ember.assert(
        'First non-optional argument must be an array, string or object',
        'object' === Ember.typeOf( underTest ) ||
        'string' === Ember.typeOf( underTest ) ||
        'array' === Ember.typeOf( underTest )
    );

    Ember.assert(
        'Second non-optional argument must be an array, string or object',
        'object' === Ember.typeOf( testFor ) ||
        'string' === Ember.typeOf( testFor ) ||
        'array' === Ember.typeOf( testFor )
    );

    return doArraysIntersect( convertToArray( underTest ), convertToArray( testFor ) );
}