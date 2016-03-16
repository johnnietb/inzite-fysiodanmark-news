<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
Class Fysiodanmark_News {

	function __construct() {
		// init functions
		date_default_timezone_set('Europe/Copenhagen');
		add_action( 'wp_enqueue_scripts' , array( $this, 'enqueue_scripts' ) );
		add_filter( 'wp_footer', array( $this, 'display_news' ));
	}

	function enqueue_scripts() {
		if ( is_home() && !is_admin() ) {
			wp_enqueue_script( 'fysiodanmark-news', plugins_url( 'fysiodanmark-news.js', __FILE__ ) , array('jquery'), '', true);
			wp_enqueue_style( 'fysiodanmark-news-styles', plugins_url( 'fysiodanmark-news.css', __FILE__ ) );
		}
	}

	function display_news() {
		$data = $this->CallAPI('GET', 'http://fysiodanmark.dk/wp-json/wp/v2/global-api', $data = array('per_page'=>1));
		if ($data) {
			$data = json_decode($data);
			// print_r($data);
			$data = $data[0];

			if ($data->content->rendered) {
				if ($data->acf) {
					$acf = $data->acf;
					// print_r($acf);
					if ( date('d-m-Y',strtotime($acf->date_start)) <= date('d-m-Y') && date('d-m-Y', strtotime($acf->date_end)) >= date('d-m-Y') ) {
						$echo_news = '<div class="fysiodanmark_parent_news news_display_type_' . $acf->type . ' news_display_placement_' . $acf->placement . '" style="background-color:'.$acf->background_color.';color:'.$acf->color.';">' . $data->content->rendered . '</div>';
						echo $echo_news;
					}
				}
			}
		}
	}


	function CallAPI($method, $url, $data = false)
	{
	    $curl = curl_init();

	    switch ($method)
	    {
	        case "POST":
	            curl_setopt($curl, CURLOPT_POST, 1);

	            if ($data)
	                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	            break;
	        case "PUT":
	            curl_setopt($curl, CURLOPT_PUT, 1);
	            break;
	        default:
	            if ($data)
	                $url = sprintf("%s?%s", $url, http_build_query($data));
	    }

	    // Optional Authentication:
	    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

	    curl_setopt($curl, CURLOPT_URL, $url);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	    $result = curl_exec($curl);

	    curl_close($curl);

	    return $result;
	}

}
$GLOBALS['Fysiodanmark_News'] = new Fysiodanmark_News();
?>
