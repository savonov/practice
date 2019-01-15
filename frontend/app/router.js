import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('correspondences_list');
  this.route('guess_list');
  this.route('admin/index');
  this.route('correspondences', {
    path: 'correspondences/:id'
  });
  this.route('guess', {
    path: 'guess/:id'
  });

  this.route('admin/add');

  this.route('admin/detail', {
    path: 'admin/detail/:id'
  });

});

export default Router;
