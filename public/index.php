<!DOCTYPE html>
<html>
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-99192633-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-99192633-1');
        </script>
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
        <script type="text/javascript" src="/bundle.js?v0.01"></script>
    </body>
</html>