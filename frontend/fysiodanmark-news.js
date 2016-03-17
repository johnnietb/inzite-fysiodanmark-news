jQuery(document).ready( function() {
	var global_news = jQuery( '.fysiodanmark_parent_news' );
	if (global_news.length > 0) {
		if (global_news.hasClass('news_display_type_0')) {
			var cloned = global_news.clone()
			global_news.remove();
			global_news = cloned;
			if ( global_news.hasClass('news_display_placement_0') ) {
				jQuery( '.header-wrapper' ).after(global_news);
				jQuery( '.header_wrapper' ).after(global_news);
			} else if ( global_news.hasClass('news_display_placement_1') ) {
				jQuery( 'footer' ).before(global_news);
			} else if ( global_news.hasClass('news_display_placement_2') ) {
				jQuery( 'body' ).prepend(global_news);
			} else if ( global_news.hasClass('news_display_placement_3') ) {
				var global_height = jQuery(window).height();
				global_news.height(global_height);
				var down_btn = jQuery('<div class="down-btn">V</div>');
				global_news.append(down_btn);
				down_btn.click( function(  ) {
					global_news.slideToggle();
				});
				jQuery( 'body' ).prepend(global_news);
			} else if ( global_news.hasClass('news_display_placement_4') ) {
				jQuery( 'body' ).append(global_news);
			}
		}
		var delay = parseInt(global_news.data('delay'))*1000;
		var close_btn = jQuery('<div class="close-btn">X</div>');
		if (global_news.hasClass('news_display_type_0')) {
			global_news.append(close_btn).delay(delay).slideToggle(500);
			close_btn.click( function(  ) {
				global_news.slideToggle();
			});
		} else {
			global_news.append(close_btn).delay(delay).fadeIn(500);
			close_btn.click( function(  ) {
				global_news.fadeOut();
			});
		}

	}
});
