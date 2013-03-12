var Newsfeed = Ember.Application.create();

Newsfeed.Router.map(function(){
	this.route('feed', {path:'/'});
});

Newsfeed.FeedRoute = Ember.Route.extend({
	model: function(){
		var model = Newsfeed.Feed.find(1);
		model.set('posts', Newsfeed.Post.find());
		//posts.set('comments', Newsfeed.Comment.find());
		return model;
	},
	setupController: function(controller, model){
		controller.set('content', model);
		controller.set('content.posts', model.get('posts'));
		console.log(controller.get('content.posts'));
		this.controllerFor('posts').set('content', model.get('posts'));
	}
});

Newsfeed.PostsView =  Ember.View.extend({
	posts:[{
		id:1,
		text:"sjdfs"
	},{
		id:2,
		text:"sdfka"
	}]
});
Newsfeed.PostsController = Ember.ArrayController.extend({

});

Newsfeed.FeedController = Ember.Controller.extend({

});
Newsfeed.Store = DS.Store.extend({
	revision:12,
	adapter: 'DS.RESTAdapter'
});

Newsfeed.Feed = DS.Model.extend({
	name:DS.attr('string'),
	posts:DS.hasMany('Newsfeed.Post')
});

Newsfeed.Post = DS.Model.extend({
	text : DS.attr('string'),
	comments:DS.hasMany('Newsfeed.Comment'),
	feed:DS.belongsTo('Newsfeed.Feed')
});

Newsfeed.Comment = DS.Model.extend({
	text: DS.attr('string'),
	post:DS.belongsTo('Newsfeed.Post')
});
