<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Poker Society</title>
    <link rel="shortcut icon" href="/poker-icon.ico"></head>
    <body>
    <?php 
        if(!isset($_GET['preview']))
        {
            $content = @file_get_contents('http://admin.thepokersociety.com/wp-json/ps/v1/settings');
            if($content)
            {
                $settings = json_decode($content);
                if(!empty($settings)){
                    if($settings->mantainance_mode=='active'){
                        ?>
                    	<div>
                        	<p></p>
                        	<p style="text-align: center;"><img class="aligncenter wp-image-36 size-medium" src="/pokersociety.png" alt="" width="300" height="229"></p>
                            <h1 style="text-align: center;">Website Under Maintenance</h1>
                            <p style="text-align: center;">Our Website is currently undergoing scheduled maintenance. Please check back soon.</p><p></p>
                    	</div>
                    	</body></html>
                    	<?php
                    	die();
                    }
                }
            }
        }
    ?>
        <div id="app"></div>
        <script type="text/javascript" src="/bundle.js"></script>
    </body>
</html>