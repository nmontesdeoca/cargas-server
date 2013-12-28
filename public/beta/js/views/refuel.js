define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, templates) {
    return Backbone.View.extend({
        template: _.template(templates.refuel),

        tagName: 'li',

        render: function (options) {
            this.$el.html(this.template(options));

            return this;
        }
    });
});