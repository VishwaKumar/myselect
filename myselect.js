(function($, window, undefined) {
	$.fn.myselect = function(settings) {

		var target = this;

		var defaultOptions = {
    		limit : 10,
    		onchangeCallback : '',
    		monthNames : 'long'
    	};

    	var currentYear = (new Date).getFullYear();
		var currentMonth = (new Date).getMonth() + 1;

		var limitYear;

		var longMonthNames = [
			"January", 
			"February", 
			"March", 
			"April", 
			"May", 
			"June", 
			"July", 
			"August", 
			"September", 
			"October", 
			"November", 
			"December"
		];
		
		var shortMonthNames = [
			"Jan", 
			"Feb", 
			"Mar", 
			"Apr", 
			"May", 
			"Jun", 
			"Jul", 
			"Aug", 
			"Sep", 
			"Oct", 
			"Nov", 
			"Dec"
		];

		var pluginWrapper = $('<div/>', { 
			class: 'myselect' 
		});

		var previous = $('<button/>', {
			class : "previous-year",
			title : "Previous Year"
		});

		var next = $('<button/>', {
			class : "next-year",
			title : "Next Year"
		});

		var select = $('<select/>');

		var element = pluginWrapper;

		function _getYearLimit (limit) {
			if(limit == 1)
				return currentYear;
			if(limit < 1)
				return currentYear - 10;
			else
				return currentYear - limit;
		}

		function _setupDom (element, options, limitYear) {
			if(options.limit != 'current-year') {
				$(element).append(previous);
				$(element).append(select);
				$(element).append(next);
			}else {				
				$(element).append(select);
			}

			_populateSelect(element, currentYear);
			_initButtonTexts(element, currentYear, limitYear);
		}

		function _populateSelect (element, year) {
			$select = $(element).children('select');
			
			$select.html('');
			$select.append($('<option/>', {
				value: "",
				text : 'Year ' + year
			}));
			
			$.each(longMonthNames, function (index, value) {
				$select.append($('<option/>', {
					value: index + 1,
					text : value + ' ' + year,
					disabled: (year == currentYear && index + 1 > currentMonth) ? true : false
				}));
			});
			
			$select.attr('data-year', year);

			if(year == currentYear) {
				$select.val(currentMonth).trigger('change');
			}
		}

		function _initButtonTexts (element, year, limitYear) {
			var selectedYear = parseInt(year);

			$previous = $(element).children('.previous-year');
			$next = $(element).children('.next-year');

			if(selectedYear == limitYear)
				$previous.attr('disabled', true).text(selectedYear - 1);
			else
				$previous.attr('disabled', false).text(selectedYear - 1);
				
			if(selectedYear == currentYear)
				$next.attr('disabled', true).text(selectedYear + 1);
			else
				$next.attr('disabled', false).text(selectedYear + 1);
		}

		function _initEventHandlers (element, limitYear, onchangeCallback) {
			$select = $(element).children('select');
			$select.change(function() {
				var month = $(this).val();
				var year = parseInt( $select.attr('data-year') );
				
				if (typeof onchangeCallback === "function") {
					onchangeCallback(month, year);
				}			
			});

			$select.val(currentMonth).trigger('change');

			$previous = $(element).children('.previous-year');
			$next = $(element).children('.next-year');

			$previous.on('click', function() {
				var selectedYear = parseInt( $select.attr('data-year') );
				var previousYear = selectedYear - 1;
				
				_populateSelect(element, previousYear);
				_initButtonTexts(element, previousYear, limitYear);
			});
			
			$next.on('click', function() {
				var selectedYear = parseInt( $select.attr('data-year') );
				var nextYear = selectedYear + 1;
				
				_populateSelect(element, nextYear);
				_initButtonTexts(element, nextYear, limitYear);
			});

			$(document).on('data-year', function() {
			    var year = $select.attr('data-year');
			    _populateSelect(year);
			});
		}

    	defaultOptions = $.extend(defaultOptions, settings);
		limitYear = _getYearLimit(defaultOptions.limit);
		_setupDom(target, defaultOptions, limitYear);
		_initEventHandlers(target, limitYear, defaultOptions.onchangeCallback);

	};
})( jQuery, window );
