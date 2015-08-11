import Ember from 'ember';

export const TYPES = Object.freeze({
    'array': [],
    'boolean': false,
    'class': Ember.Object.extend(),
    'date': new Date(),
    'error': new Error( 'test' ),
    'function' : function() {},
    'instance': Ember.Object.create(),
    'null': null,
    'object': {},
    'regexp': /test/,
    'string': '',
    'undefined': undefined
});

/**
 * @module
 */

/**
 * Test that an argument passed to a function is of the required type(s).
 *
 * @function
 * @param {Function} methodUnderTest
 * @param {Object | null} context
 * @param {Object | null} context
 * @returns {Object}
 */
export function argumentTypes( fn, context ) {
    return new ArgumentTypes( fn, context, TYPES );
}

export class ArgumentTypes {

    constructor( fn, context, typesObject ) {
        this.types = typesObject;
        this.fn = fn;
        this.context = context || null;
        this.args = [];
        this.excludeTypes = Ember.A();
        this.index = 0;
    }

    arg( position ) {
        this.index = position - 1;
        return this;
    }

    set( value ) {
        this.args[ this.index ] = value;
        return this;
    }

    exclude() {
        this.excludeTypes = this.getArgumentsArray( arguments );
        return this;
    }

    include() {
        this.excludeTypes.removeObjects( this.getArgumentsArray( arguments ) );
        return this;
    }

    getArgumentsArray( args ) {
        let argumentsArray = args[ 0 ];

        if ( Ember.typeOf( args[ 0 ] ) === 'string' ) {
            argumentsArray = Array.prototype.slice.apply( args );
        }

        return Ember.A( argumentsArray );
    }

    accepts() {
        const argumentPosition = this.index;
        const results = [];
        let argumentsArray = this.getArgumentsArray( arguments );

        for( let type in this.types ) {
            if ( this.excludeTypes.contains( type ) ) {
                continue;
            }

            this.args[ argumentPosition ] = this.types[ type ];
            let exceptionThrown = false;

            try {
                this.fn.apply( this.context, this.args );
            } catch( error ) {
                exceptionThrown = true;
            }

            if ( argumentsArray.contains( type ) ) {
                results.push({
                    message: `${ type } should be accepted`,
                    passed: ( false === exceptionThrown )
                });
            } else {
                results.push({
                    message: `${ type } should not be accepted`,
                    passed: ( true === exceptionThrown )
                });
            }
        }

        return results;
    }
}
