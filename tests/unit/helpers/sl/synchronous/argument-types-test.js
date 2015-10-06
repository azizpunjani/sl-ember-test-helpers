import { test } from 'ember-qunit';
import { argumentTypes } from '../../../../helpers/sl/synchronous/argument-types';
import { TYPES as types } from '../../../../helpers/sl/synchronous/argument-types';


module( 'Unit | Helper | sl/synchronous/argument-types' );

test( 'It exists', function( assert ) {
    assert.ok(
        argumentTypes
    );
});

test( 'First argument can only be a function', function( assert ) {

    for( let type in types ) {
        console.log( types[ type ] );
       const testFunction = () => {
           argumentTypes( types[ type ] );
           return true;
       };

       if ( type === 'function' ) {
           assert.ok(
               testFunction(),
               'function should not throw an error'
           );
       } else {
           assert.throws(
               testFunction,
               `${ type } should throw an error`
           );
       }
    }
});

