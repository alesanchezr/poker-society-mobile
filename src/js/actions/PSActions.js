import Flux from '@4geeksacademy/react-flux-dash';
import API from '../API';
import $ from "jquery";

export const getMenu = function(){
    API.menus().id(2).then(( data ) => {
        // do something with the returned posts
        Flux.dispatchEvent('menu', data);
        
        $(".dropdown-toggle, .submenu-toggle").click(function(e){
          $(this).toggleClass("open");
          $(this).siblings('.dropdown-menu').toggleClass("show");
        });
    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
};