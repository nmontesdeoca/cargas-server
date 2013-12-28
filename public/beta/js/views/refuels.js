define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/refuel'
], function ($, _, Backbone, templates, RefuelView) {
    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list',

        render: function () {
            var refuelsHTML = '';
            
            _.each(APP_REFUELS, function (refuel) {
                refuelsHTML += new RefuelView().render(refuel).el.outerHTML;
            });

            this.$el.html(refuelsHTML);

            return this;
        }
    });
});