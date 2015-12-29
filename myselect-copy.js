(function($, undefined) {
	$.fn.myselect = function(options) {
		options = $.extend({ limit: 10, onchangeCallback: ''}, options);
		
		var currentYear = (new Date).getFullYear();
		var currentMonth = (new Date).getMonth() + 1;
		var limitYear;
		
		if(options.limit == 1)
			limitYear = currentYear;
		if(options.limit < 1)
			limitYear = currentYear - 10;
		else
			limitYear = currentYear - options.limit;
		
		var monthNamesLong = [
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
		
		var monthNamesShort = [
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
		
		var wrapper = $('<div class="myselect"></div>');
		var previous = $('<button class="previous-year" title="Previous Year"><i class="fa fa-caret-left"></i><span></span></button>');
		var next = $('<button class="next-year" title="Next Year"><span></span><i class="fa fa-caret-right"></i></button>');
		var select = $('<select></select>');
		
		var element = $(wrapper);
		
		if(options.limit != 'current-year') {
			$(element).append(previous);
			$(element).append(select);
			$(element).append(next);
		}else {
			$(element).append(select);
		}
						
		$(select).change(function() {
			var month = $(this).val();
			var year = parseInt($(select).attr('data-year'));
			
			if (typeof options.onchangeCallback === "function") {
				options.onchangeCallback(month,year);
			}			
		});
		
		populateSelect(currentYear);			
		
		this.append(element);
		
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
			
			$.each(monthNamesLong, function (index, value) {						
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
			
			if(options.limit != 'current-year') {
				initializeButtons(year);
			}
		}
		
		function initializeButtons(year) {
			var selectedYear = parseInt(year);
			
			if(selectedYear == limitYear)
				$(previous).attr('disabled', true).find('span').html(selectedYear - 1);
			else
				$(previous).attr('disabled', false).find('span').html(selectedYear - 1);
				
			if(selectedYear == currentYear)
				$(next).attr('disabled', true).find('span').html(selectedYear + 1);
			else
				$(next).attr('disabled', false).find('span').html(selectedYear + 1);
		}
	};
})(jQuery);
