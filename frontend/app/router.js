import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('exercises', function () {
    this.route('view', {
      path: '/:id'
    });
    this.route('create');
    this.route('update', {
      path: '/update/:id/'
    });
    this.route('matching', {
      path: '/matching/:id'
    });
    this.route('typing', {
      path: 'typing/:id'
    });
    this.route('tasks', {
      path: '/:id/tasks'
    });
  });

  this.route('items', function () {
    this.route('view', {
      path: '/:id'
    });
    this.route('create');
    this.route('update', {
      path: '/update/:id/'
    });
  });
});

export default Router;
