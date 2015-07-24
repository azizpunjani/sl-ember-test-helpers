import Ember from 'ember';
import { test } from 'ember-qunit';

const types = Object.freeze({
    'null': null,
    'undefined': undefined,
    'array': [],
    'object': {},
    'function' : function() {}
});

function validateParams( property, options ) {
   Ember.assert(
       'Property is a string',
       'string' === Ember.typeOf( property )
   );

   Ember.assert(
       'Options is an Object',
       isObject( options )
   );

   Ember.assert(
       'Accepts property must be an String or Array',
       'string' === Ember.typeOf( options.accepts ) ||
       'array' === Ember.typeOf( options.accepts )
   );

   Ember.assert(
       'Properties property is a plain javascript object',
       isObject( options.properties )
   );

   if ( 'array' === Ember.typeOf( options.accepts ) ) {
      const typesArray = Ember.A( Object.keys( types ) );
      options.accepts.forEach( (type) => {
          Ember.assert(
              'Accepts value passed in is a valid type',
              typesArray.contains( type )
          );
      });

   }
}

function isObject( property ) {
   /* jshint ignore:start */

   return 'object' === Ember.typeOf( property ) &&
          'symbol' !== typeof property;

   /* jshint ignore:end */
}

export default function testProperty( property, options ) {
   validateParams( property, options );

   let accepts = options.accepts;
   const properties = Ember.Object.create( options.properties );

   if ( 'array' !== Ember.typeOf( accepts ) ) {
       accepts = [ accepts ];
   }

   accepts = Ember.A( accepts );

   for( let type in types ) {
       /*jshint loopfunc: true */

       let testText = "'"+ property + "' " + 'property of type ' + type;

       if ( accepts.contains(type) ) {
           testText += ' is a valid value';
       } else {
           testText += ' is invalid';
       }

       test(testText, function( assert ) {
           const callSubject = () => {
               properties.set( property, types[type] );
               return this.subject( properties );
           };

           if ( accepts.contains(type) ) {
              assert.ok(
                  callSubject()
              );
           } else {
               assert.throws(
                   callSubject
               );
           }
       });
   }
}
