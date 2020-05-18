var __kdt;
EBANX.deviceFingerprint.konduto = {

	setup: function (settings, cb) {
		this._execute(settings, cb);
	},

	_execute: function (settings, cb) {
		__kdt = __kdt || [];
		__kdt.push({"public_key": settings.token});

		var visitorId = (function() {
			var kdt = document.createElement('script');
			kdt.id = 'kdtjs'; kdt.type = 'text/javascript';
			kdt.async = true;
			kdt.src = 'https://i.k-analytix.com/k.js';

			document.getElementsByTagName('head')[0].appendChild(kdt);

			var period = 300;
			var limit = 20e3;
			var i = 0;

			var isAvailable = function(obj) {
				return typeof(obj) != "undefined";
			};

			var intervalID = setInterval(function() {
				var clear = limit/period <= ++i;

				if (isAvailable(window["Konduto"]) && isAvailable(Konduto["getVisitorID"])) {
					clear = true;
					cb(Konduto.getVisitorID());
				}

				if (clear) clearInterval(intervalID);
			}, period);
		})();
	}
};
