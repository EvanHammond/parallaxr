;(function ($, window, document, undefined) {
	var pluginName = "parallaxr",
		defaults = {};

	function Plugin (element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.previous = 0;
		this.current = 0;
		this.w = $(window);
		this.d = $(document);
		this.max = this.d.height() - this.w.height();
		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.map = $.map($(this.element).find(".parallaxr"), function(e, i){
				$e = $(e);
				var pos = $e.css("background-position").replace(/%/g, "").split(" ");

				return {
					"ref": $e,
					"rate": $e.data("prate"),
					"oPos": pos,
					"nPos": pos
				}
			});

			this.w.on("scroll", {"plugin":this}, function(e){
				var plugin = e.data.plugin;
				plugin.previous = plugin.current;
				plugin.current = plugin.w.scrollTop();

				for (var i = 0; i < plugin.map.length; i++) {
					var mi = plugin.map[i];
					var delta = (plugin.w.scrollTop() / mi.rate);
					var max = plugin.max / mi.rate;

					if (delta >= 0 && delta <= max) {
						mi.nPos[1] = delta;
						plugin.refresh(mi);
					}
				}
			});
		},

		refresh:function(mapItem) {
			mapItem.ref.css("background-position", (mapItem.nPos[0] + "% -" + mapItem.nPos[1] + "px"));
		}
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};
})( jQuery, window, document );