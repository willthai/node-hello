var W = {};
$(document).ready(function() {

	$('#getProduct').click(function(e) {
		var config = {
			url:'insertProduct',
			data: {
				product: $('#product').val() || ''
			}
		}
		$.ajax(config).done(function() {
			alert('got it')
		});
	});
	$('#getAll').click(function(e) {
		var config = {
			url: 'getAll',
		}
		$.ajax(config).done(function() {
			alert('got all');
		});
	});
});
