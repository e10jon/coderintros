(function($) {
	$( document ).ready(function() {
		watchForDropdownChange();
	});

	function watchForDropdownChange() {
		var target = '#all-image-sizes-dropdown';
		var urlsHolder = '#all-image-sizes-urls';

		$( target ).unbind( 'change' );

		$( target ).change(function() {
			var name = $( target ).val();

			var selector = "input[type='hidden'][name='" + name + "']";
			
			var val = ($( selector ).val());

			$( urlsHolder ).val( val );

			 $( urlsHolder ).addClass( 'input-changed-bg' );

			setTimeout(function(){           
			    $( urlsHolder ).removeClass( 'input-changed-bg' );
			}, 150);

			// $( "input[type='hidden'][name='ProductCode']").each(function(){ ...
			// urls
		});
		setTimeout(function() {
	      	watchForDropdownChange();
		}, 1000);
	}

})(jQuery);