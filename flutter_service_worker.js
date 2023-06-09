'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "009c9e65172e010890f7f65fde438006",
"splash/img/light-2x.png": "bdf030b04bca77bad76c0e822580fd2a",
"splash/img/dark-1x.gif": "9aa9f322860a9eb4b6f1d388ba3704c3",
"splash/img/dark-4x.png": "9721e4a6cc8b7e950754cdb56f059f18",
"splash/img/light-3x.png": "6ef2f2382e8e71397602bf27561451d1",
"splash/img/dark-3x.png": "6ef2f2382e8e71397602bf27561451d1",
"splash/img/light-4x.png": "9721e4a6cc8b7e950754cdb56f059f18",
"splash/img/light-1x.gif": "9aa9f322860a9eb4b6f1d388ba3704c3",
"splash/img/dark-2x.png": "bdf030b04bca77bad76c0e822580fd2a",
"splash/img/light-2x.gif": "735cdf63e23aa44586a88a5ef5b7666b",
"splash/img/dark-1x.png": "71f86557157f7283773ed020e43e109c",
"splash/img/dark-4x.gif": "59163d472b984ff7ca838f64770b6ca1",
"splash/img/light-3x.gif": "5b3eb38b0f745a5093a618eea8af2409",
"splash/img/dark-3x.gif": "5b3eb38b0f745a5093a618eea8af2409",
"splash/img/light-4x.gif": "59163d472b984ff7ca838f64770b6ca1",
"splash/img/light-1x.png": "71f86557157f7283773ed020e43e109c",
"splash/img/dark-2x.gif": "735cdf63e23aa44586a88a5ef5b7666b",
"index.html": "148027129205fc4029c9aaa919b06f80",
"/": "148027129205fc4029c9aaa919b06f80",
"main.dart.js": "3b3996dc66a9fdf09d1684c91766c71f",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "c1b5fceecf7adf07e0e02c5baf51c533",
"icons/Icon-192.png": "835a4220d1a3057db7a6146de69dc8b1",
"icons/Icon-maskable-192.png": "835a4220d1a3057db7a6146de69dc8b1",
"icons/Icon-maskable-512.png": "54c39fbbb2d0832d8d3e2feadf1f0949",
"icons/Icon-512.png": "54c39fbbb2d0832d8d3e2feadf1f0949",
"manifest.json": "383624c329a4a62df2fe1f831b123106",
"assets/AssetManifest.json": "b35749396a1e2c0b30abe15791b9e665",
"assets/NOTICES": "895b8871f8975770e67d9cd6f1d864c8",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "efc6c90b58d765987f922c95c2031dd2",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "01bb14ae3f14c73ee03eed84f480ded9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "0db203e8632f03baae0184700f3bda48",
"assets/packages/loading_gifs/assets/images/circular_progress_indicator_small.gif": "502a31bacaa2182d511eb4866354fbab",
"assets/packages/loading_gifs/assets/images/circular_progress_indicator.gif": "ce0141cf86895cf948736c923fa92ade",
"assets/packages/loading_gifs/assets/images/cupertino_activity_indicator.gif": "3990e106caf3029a36788b9b58a86b41",
"assets/packages/loading_gifs/assets/images/cupertino_activity_indicator_small.gif": "05ffb16f4f31cf9941a8295740476ee1",
"assets/packages/loading_gifs/assets/images/placeholder_empty.png": "978c1bee49d7ad5fc1a4d81099b13e18",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.smcbin": "1a1cd6597fe9c6bd96ab26c62824e371",
"assets/fonts/MaterialIcons-Regular.otf": "bba03cc5103ee47914b9c57a5c0c8f4b",
"assets/assets/images/icon.png": "d1d7dc3f8aa1c1d93d2f3f24ea956c8e",
"assets/assets/images/project-1.png": "7413492a303bf7f7df75c505fb6575e4",
"assets/assets/images/project-2.png": "e69adb7ad2c9c140c334df600977b387",
"assets/assets/images/avatar_default.png": "177f26d29abcba27000ad4ee9888e4b9",
"assets/assets/images/launch-icon.gif": "30707581814a50561cdbbc00ffc4d97b",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
