import merge from './modules/common';
import FixedHeader from './modules/fixed';
// init
document.addEventListener('DOMContentLoaded', function() {
	let fixedHeader = new FixedHeader({
        simpleMode: false,
        target: '.header'
    });
});
