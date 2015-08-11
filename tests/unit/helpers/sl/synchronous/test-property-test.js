import Ember from 'ember';
import { test } from 'ember-qunit';
import { testProperty } from '../../../../helpers/sl/synchronous/test-property';

module( 'Unit | Helpers | sl/synchronous/test-property' );

test( 'It exists', function( assert ) {
    assert.ok(
        testProperty
    );
});

test( 'Property name needs to be a string', function( assert ) {

});

test( 'Options parameter need to be an Object', function( assert ) {
    let callSubject = () => testProperty('test', null);

    assert.throws(
        callSubject,
        'property was null'
    );

    //Array
    let callSubject = () => testProperty('test', []);

    assert.throws(
        callSubject,
        'property was an Array'
    );

    // String
    let callSubject = () => testProperty('test', '');

    assert.throws(
        callSubject,
        'property was a String'
    );

    // undefined
    properties.set( 'options', undefined );

    assert.throws(
        callSubject,
        'property was undefined'
    );

});
