var RefuelModel = Backbone.Model.extend({
    urlRoot: '/refuel'
});

var RefuelsCollection = Backbone.Collection.extend({
    url: '/refuels2',
    model: RefuelModel
});

var RefuelsView = Backbone.View.extend({
    template: _.template($('#refuel-list').html()),

    initialize: function () {
        this.refuels = new RefuelsCollection();
    },

    load: function () {
        return this.refuels.fetch();
    },

    render: function () {
        this.$el.html(this.template({ refuels: this.refuels }));
        return this;
    }
});

var RefuelFormView = Backbone.View.extend({
    template: _.template($('#refuel-form').html()),

    tagName: 'form',

    events: {
        'click button': 'saveRefuel'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    serialize: function () {
        return {
            cost: this.$('[name=cost]').val(),
            capacity:  this.$('[name=capacity]').val(),
            kilometers:  this.$('[name=kilometers]').val()
        };
    },

    saveRefuel: function (e) {
        e.preventDefault();

        new RefuelModel(this.serialize()).save().then(function (refuel) {
            Backbone.history.navigate('/refuels', { trigger: true });
        });
    }
});

var Router = Backbone.Router.extend({
    routes: {
        'form': 'showForm',
        'refuels': 'showRefuels'
    },

    showForm: function () {
        var view = new RefuelFormView();

        view.render();

        $('.content').html(view.el);
    },

    showRefuels: function () {
        var view = new RefuelsView();

        view.load().then(function () {
            view.render();
            $('.content').html(view.el);
        });
    }
});

var router = new Router();

Backbone.history.start({ pushState: true });

$('body').on('click', 'a[href]', function (e) {
    e.preventDefault();

    Backbone.history.navigate(this.getAttribute('href'), { trigger: true });
});
