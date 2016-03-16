jQuery(document).ready( function() {
	if (jQuery( '.fysiodanmark_parent_news' ).length > 0) {
		var close_btn = jQuery('<div class="close-btn">X</div>');
		jQuery( '.fysiodanmark_parent_news' ).append(close_btn).fadeIn(500);
		close_btn.click( function(  ) {
			jQuery( '.fysiodanmark_parent_news' ).slideToggle();
		});
	}

});
