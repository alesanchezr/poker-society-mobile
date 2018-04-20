/* global FontAwesomeConfig */
import fontawesome from '@fortawesome/fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH';
fontawesome.config = {
  autoReplaceSvg: 'nest'
};
fontawesome.library.add(
    faSearch, faArrowUp, faSlidersH
);