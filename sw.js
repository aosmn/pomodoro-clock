self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('pomodoro').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/scripts.js',
          '/manifest.json',
          '/icon.png',
          'https://code.jquery.com/jquery-3.3.1.min.js',
          '/resources/bleep_02.wav',
          '/resources/computerbeep2.wav',
          'https://fonts.gstatic.com/s/dosis/v7/HhyaU5sn9vOmLzloC_U.woff2'
        ]);
      })
    );
   });
   
   
   self.addEventListener('fetch', function(event) {
     event.respondWith(
       caches.match(event.request).then(function(response) {
         return response || fetch(event.request);
       })
     );
   });