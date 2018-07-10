/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null // This callback runs after the dialog was hidden
			}, options);

			// Configuring dialog
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		/**
		 * Closes dialog
		 */
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);

var screenshotDialog = screenshotDialog || (function ($) {
	'use strict';

// Creating modal dialog's DOM
var $dialog = $(
	'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:5%; overflow-y:visible;">' +
	'<div class="modal-dialog modal-m">' +
	'<div class="modal-content">' +
		'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
		'<div class="modal-body text-center">' +
			'<video autoplay style="border: 1px solid #ddd; width: 400px; height: 300px;"></video>' +
			'<hr/>' +
			'<img src="" width="400px" height="300px" style="border: 1px solid #ddd;">' +
			'<p><small class="text-muted">actual image size <span></span></small></p>' +
		'</div>' +
		'<div class="modal-footer">' +
			'<div class="row">' + 
				'<div class="col col-md-4"><button class="btn btn-danger btn-block btn-cancel-screenshot">Cancel</button></div>' +
				'<div class="col col-md-4"><button class="btn btn-default btn-block btn-capture-screenshot">Take Picture</button></div>' +
				'<div class="col col-md-4"><button class="btn btn-success btn-block btn-accept-screenshot" disabled="disabled">Accept</button></div>' +
			'</div>' +
		'</div>' + 
	'</div></div></div>');

	var placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
	var video = $dialog.find('video').get(0);
	var capture = $dialog.find('.btn-capture-screenshot').get(0);
	var cancel = $dialog.find('.btn-cancel-screenshot').get(0);
	var accept = $dialog.find('.btn-accept-screenshot').get(0);
	var img = $dialog.find('img').get(0);
	var span = $dialog.find('span').get(0);

	var filters = [
    'grayscale',
    'sepia',
    'blur',
    'brightness',
    'contrast',
    'hue-rotate',
    'hue-rotate2',
    'hue-rotate3',
    'saturate',
    'invert',
    ''
  ];

return {
	/**
	 * Opens our dialog
	 * @param message Custom message
	 * @param options Custom options:
	 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
	 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
	 */
	show: function (config = {}) {
		var message = 'Take Screenshot';
		var options = {};
		var media = null;
		var value = null;
		var done = function() {};
		var error = function() {};
		var width = 400;
		var height = 300;
		var filterIndex = 0;

		img.src = placeholder;

		// Assigning defaults
		if (config.hasOwnProperty('options')) {
			options = config.options;
		}
		if (!config.hasOwnProperty('message')) {
			message = config.message;
		}
		if (config.hasOwnProperty('media')) {
			media = config.media;
		}
		if (config.hasOwnProperty('done') && typeof config.done === 'function') {
			done = config.done;
		}
		if (config.hasOwnProperty('error') && typeof config.error === 'function') {
			error = config.error;
		}
		if (config.hasOwnProperty('width') && typeof config.width === 'number') {
			width = config.width;
			img.width = width < 400 ? width : img.width;
		}
		if (config.hasOwnProperty('height') && typeof config.height === 'number') {
			height = config.height;
			img.height = height;
		}
		if (config.hasOwnProperty('filters')) {
			filters = config.filters;
		}

		span.innerText = width + 'x' + height;

		video.onclick = function() {
			video.className = filters[filterIndex++ % filters.length];
			img.className = video.className;
		};
		
		capture.onclick = function() {
			try {
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = width;
				canvas.height = height;
				var factor = 1.0;
				
				// Major resize (down)
				if (width / video.videoWidth < 0.5 || height / video.videoHeight < 0.5) {
					factor = 0.5;
				} else if (width / video.videoWidth > 1.5 || height / video.videoHeight > 1.5) {
					factor = 1.5;
				}

				var oc = document.createElement('canvas');
				var octx = oc.getContext('2d');
				oc.width = video.videoWidth * factor;
				oc.height = video.videoHeight * factor;
				octx.drawImage(video, 0, 0, oc.width, oc.height);
				ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height);

				// Other browsers will fall back to image/png
				img.src = canvas.toDataURL('image/png');
				value = [{
					storage: 'base64',
					type: 'image/png',
					url: img.src,
					name: 'screenshot-' + uuidv4() + '.png',
					originalName: 'screenshot.png',
					data: img.src.split(',')[1],
					size: Math.round((img.src.split(',')[1].length)*3/4)
				}];
				accept.disabled = false;
			} catch(err) {
				error(err);
			}
		};

		accept.onclick = function() {
			video.srcObject.getTracks()[0].stop();
			done(value);
			$dialog.modal('hide');
		}

		cancel.onclick = function() {
			video.srcObject.getTracks()[0].stop();
			done(null);
			$dialog.modal('hide');
		};

		var settings = $.extend({
			dialogSize: 'm',
			progressType: '',
			onHide: null // This callback runs after the dialog was hidden
		}, options);

		// Configuring dialog
		$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
	
		$dialog.find('h3').text(message);
		// Adding callbacks
		if (typeof settings.onHide === 'function') {
			$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
				settings.onHide.call($dialog);
			});
		}

		// Opening dialog
		$dialog.modal();

		if (media !== null) {
			media.then(function(stream) {
				video.srcObject = stream;
			}).catch(error);
		}
		
	},
	/**
	 * Closes dialog
	 */
	hide: function () {
		$dialog.modal('hide');
	}
};

})(jQuery);

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


function getLocation() {
  waitingDialog.show('Getting your location...', {dialogSize: 'sm', progressType: 'info'});
  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          waitingDialog.hide();
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
    } else {
        waitingDialog.hide();
        reject('geolocation not available');
    }
  });
};

function takeScreenshot(config = {}) {
	return new Promise(function(resolve, reject) {
		if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			config.media = navigator.mediaDevices.getUserMedia({ video: true});
			config.done = resolve;
			config.error = reject;
			screenshotDialog.show(config);
		}
	});
}