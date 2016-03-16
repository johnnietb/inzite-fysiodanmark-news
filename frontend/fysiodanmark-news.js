jQuery(document).ready( function() {
	var global_news = jQuery( '.fysiodanmark_parent_news' );
	if (global_news.length > 0) {
		if (global_news.hasClass('news_display_type_0')) {
			var cloned = global_news.clone()
			global_news.remove();
			global_news = cloned;
			if ( global_news.hasClass('news_display_placement_0') ) {
				jQuery( 'main' ).before(global_news);
			} else if ( global_news.hasClass('news_display_placement_1') ) {
				jQuery( 'main' ).after(global_news);
			}
		}
		var close_btn = jQuery('<div class="close-btn">X</div>');
		global_news.append(close_btn).fadeIn(500);
		close_btn.click( function(  ) {
			global_news.slideToggle();
		});
	}
});
