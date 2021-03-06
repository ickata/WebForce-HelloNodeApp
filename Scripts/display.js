/**
 * @class MyCustomClass
 * 
 * This is the application's main class that will be instantiated for each 
 * added element.
 * 
 * @see  http://mootools.net/core/docs/1.6.0/Class/Class
 * @see  http://support.webforce.com/customer/en/portal/articles/1952312-applications
 */
MyCustomClass = new Class({
   
   // We must extend the property framework base class
   Extends     : SK.UI.Element.Application.Display,
   
   // These values will be used for properties of freshly added elements
   default_property_values : {
      name : 'WebForce'
   },
   
   /**
    * @constructor
    * 
    * @param  {Object} env Environment object containing DOM placeholder, properties, session, etc.
    * 
    * @return {Object}     MyCustomClass instance
    */
   initialize  : function ( env ) {
      this.parent( env );  // calling the super constructor
      
      /**
       * If we need to do async operations before generating the final DOM,
       * we must make sure that the server won't send the response
       * before these calls complete.
       * To do that, the framework provides a `lifecycle` object with
       * `lock` and `unlock` methods.
       * 
       * To simulate such async operation we will use `setTimeout`.
       */
      
      // Notify the framework that we are not yet finished. The server must not
      // send response until we tell the framework to do so.
      if ( Browser.name == 'nodejs' ) {
         // `lifecycle` is available only on the server
         SK.Singletons.lifecycle.lock();
      }
      
      // `setTimeout` will mimic our async operation.
      setTimeout( function () {
         // dynamically create some content
         _$( env.placeholder )                  // this is our root DOM element (keeping all this content)
               .getElement( '.my-paragraph' )   // our element in which we wish to insert content
               .set( 'html', 'My dynamically created content' );
         
         // Notify the framework that we are ready.
         if ( Browser.name == 'nodejs' ) {
            // `lifecycle` is available only on the server
            SK.Singletons.lifecycle.unlock();
         }
      }, 500 );
   }
   
});
