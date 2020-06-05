var __kdt;
EBANX.deviceFingerprint.konduto = {

	setup: function (settings, cb) {
		this._execute(settings, cb);
	},

	_execute: function (settings, cb) {
		__kdt = __kdt || [];
		__kdt.push({"public_key": settings.token});

		var visitorId = (function() {
			let kdt = document.createElement('script');
			kdt.id = 'kdtjs'; kdt.type = 'text/javascript';
			kdt.async = true;
			kdt.src = 'https://i.k-analytix.com/k.js';

			document.getElementsByTagName('head')[0].appendChild(kdt);

			let period = 300;
			let maxAttempts = 5;
			let attempts = 0;
			let deviceId = '';

			let isAvailable = function(obj) {
				return typeof(obj) != 'undefined';
			};

			let shouldClearInterval = false;
			let isProviderInitialized = function() {
				if (attempts >= maxAttempts) {
					shouldClearInterval = true;
				}

				attempts++;
				if (isAvailable(window['Konduto']) && isAvailable(Konduto['getVisitorID'])) {
					shouldClearInterval = true;
					deviceId = Konduto.getVisitorID();
				}

				if (shouldClearInterval) {
					clearInterval(intervalID);
					cb(deviceId);
				}
			};

			let intervalID = setInterval(isProviderInitialized, period);

		})();
	}
};
