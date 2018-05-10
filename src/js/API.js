/* global process */
import WPAPI from 'wpapi';

let API = new WPAPI({ endpoint: process.env.API_HOST });
API.tournament = API.registerRoute( 'ps/v1', '/tournament/(?P<id>\\d+)' );
API.calendar = API.registerRoute( 'ps/v1', '/calendar/(?P<id>\\d+)' );
API.casino = API.registerRoute( 'ps/v1', '/casino/(?P<id>\\d+)' );
API.menus = API.registerRoute( 'wp-api-menus/v2', '/menus/(?P<id>\\d+)' );
export default API;