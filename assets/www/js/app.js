angular.module('songApp', ['ionic', 'songApp.controllers', 'songApp.services'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

      .state('tab.songs', {
          url: '/browse',
          views: {
            'browse-songs': {
              templateUrl: 'templates/browse.html',
              controller: 'BrowseCtrl'
            }
          }
       })

      .state('song', {
           url: "/song",
           abstract: true,
           templateUrl: "templates/song.html"
      })

          .state('song.song-info', {
              url: '/:songId/info',
              views: {
                'song-info': {
                  templateUrl: 'templates/song-info.html',
                  controller: 'SongInfoCtrl'
                }
              }
          })
          .state('song.song-action', {
             url: '/:songId/action',
             views: {
               'song-action': {
                 templateUrl: 'templates/song-action.html',
                 controller: 'SongActionCtrl'
               }
            }
          })
              .state('song.song-edit', {
                 url: '/:songId/edit',
                 views: {
                   'song-edit': {
                     templateUrl: 'templates/edit-song.html',
                     controller: 'SongEditCtrl'
                   }
                 }
              })

              .state('song.song-add-setlist', {
                 url: '/:songId/setlist',
                 views: {
                   'song-action': {
                     templateUrl: 'templates/add-to-setlist.html',
                     controller: 'SongAddToSetlistCtrl'
                   }
                 }
              })


  $urlRouterProvider.otherwise('tab/browse');
});
