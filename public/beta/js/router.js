// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/refuels'
], function ($, _, Backbone, RefuelsView) {
  
  var AppRouter = Backbone.Router.extend({
        routes: {
            'refuels': 'showRefuels'
        },

        showRefuels: function () {
            var refuels_view = new RefuelsView();

            refuels_view.render();

            $('.content').html(refuels_view.el);
        }

    });
    
    return { 
        initialize: function(){
            var app_router = new AppRouter;
            Backbone.history.start();
        }
    };
});
