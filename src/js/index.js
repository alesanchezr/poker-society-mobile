//import react into the bundle
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import icons from './icons.js';

//include your index.scss file into the bundle
import '../styles/index.scss';

//import your own components
import Layout from './Layout.jsx';

//render your react application
ReactDOM.render(
    <Layout />,
    document.querySelector('#app')
);

import $ from "jquery";

$(".navbar-toggler").click(function(e){
  $(this).toggleClass("collapsed");
  $(this).siblings('.collapse').toggleClass("show");
});