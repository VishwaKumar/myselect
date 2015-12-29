(function($, window, undefined) {
	$.fn.myselect = function(settings) {

		var thisEle = this;

		var defaultOptions = {
    		limit: 10,
    		onchangeCallback: ''
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

		return $(thisEle).each(function() {        	

        	defaultOptions = $.extend(defaultOptions, settings);       	
		
			if(defaultOptions.limit == 1)
				limitYear = currentYear;
			if(defaultOptions.limit < 1)
				limitYear = currentYear - 10;
			else
				limitYear = currentYear - defaultOptions.limit;			
		
			if(defaultOptions.limit != 'current-year') {
				$(element).append(previous);
				$(element).append(select);
				$(element).append(next);
			}else {
				$(element).append(select);
			}

			$(select).change(function() {
				var month = $(this).val();
				var year = parseInt($(select).attr('data-year'));
				
				if (typeof defaultOptions.onchangeCallback === "function") {
					defaultOptions.onchangeCallback(month, year);
				}			
			});

			populateSelect(currentYear);

			$(thisEle).append(element);

			$(previous).on('click', function() {
				var selectedYear = parseInt($(select).attr('data-year'));
				var previousYear = selectedYear - 1;
				
				populateSelect(previousYear);
			});
			
			$(next).on('click', function() {
				var selectedYear = parseInt($(select).attr('data-year'));
				var nextYear = selectedYear + 1;
				
				populateSelect(nextYear);
			});
			
			$(document).on('data-year', function() {
			    var year = $(select).attr('data-year');
			    populateSelect(year);
			});

			function populateSelect(year) {
				$(select).html("");
				$(select).append($('<option/>', {
					value: "",
					text : 'Year ' + year
				}));
				
				$.each(longMonthNames, function (index, value) {
					$(select).append($('<option/>', {
						value: index + 1,
						text : value + ' ' + year,
						disabled: (year == currentYear && index + 1 > currentMonth) ? true : false
					}));
				});
				
				$(select).attr('data-year',year);
				
				if(year == currentYear) {
					$(select).val(currentMonth).trigger('change');
				}
				
				if(defaultOptions.limit != 'current-year') {
					initializeButtons(year);
				}
			}
			
			function initializeButtons(year) {
				var selectedYear = parseInt(year);
				
				if(selectedYear == limitYear)
					$(previous).attr('disabled', true).text(selectedYear - 1);
				else
					$(previous).attr('disabled', false).text(selectedYear - 1);
					
				if(selectedYear == currentYear)
					$(next).attr('disabled', true).text(selectedYear + 1);
				else
					$(next).attr('disabled', false).text(selectedYear + 1);
			}

        });
	};
})( jQuery, window );
