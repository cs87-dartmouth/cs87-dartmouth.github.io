// Course navigation on top of page

// load a different font
// document.write('<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,100italic,300italic,400italic,700" rel="stylesheet" type="text/css">\n');

// load css first so the navbar doesn't flash
document.write('<link rel="stylesheet" type="text/css" href="../css/common.css?">\n');
document.write(
`<nav id="navbar">
    <span class="brand"></span>
    <span class="course">CS87</span>
    <ul class="nav-menu nav-center">
        <li><a href="../syllabus/">Syllabus</a></li>
        <li><a href="../schedule/">Schedule</a></li>
        <li><a id="assignments" href="../assignments/">Assignments</a>
        <ul>
            <li><a href="../assignment0/">Assignment 0</a></li>
            <li><a href="../assignment1/">Assignment 1</a></li>
            <li><a href="../assignment2/">Assignment 2</a></li>
            <li><a href="../assignment3/">Assignment 3</a></li>
            <li><a href="../assignment4/">Assignment 4</a></li>
            <li><a href="../assignment5/">Assignment 5</a></li>
            <li><a href="../assignment5/">Final project</a></li>
        </ul>
        </li>
    </ul>
</nav>
`);

function selectActivePage() {
    const currentLocation = location.href;
    // special handling for nested short assignment and lab pages
    if (currentLocation.match(/(assignment\d{1})/)) {
        document.getElementById("assignments").className = "active"
    }
    else {
        // highlight the menu item for the current page
        const menuItem = document.getElementById("navbar").querySelectorAll("a");
        for (var i = 0; i < menuItem.length; i++) {
            if (menuItem[i].href === currentLocation) {
                menuItem[i].className = "active"
            }
        }
    }

    $(".twentytwenty-container").twentytwenty({default_offset_pct: 0.5});
}


if (window.markdeepOptions === undefined) {
    window.markdeepOptions = {};
}

if (!markdeepOptions.tocStyle) {
    // Default table of contents style, unless
    // previously specified
    markdeepOptions.tocStyle = 'none';
}

markdeepOptions.onLoad = "selectActivePage()";
markdeepOptions.inlineCodeLang = 'C++';

document.write(
`<!-- Markdeep: -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="../js/jquery.event.move.js"></script>
<script src="../js/jquery.twentytwenty.js"></script>
<link href="../css/offcanvas.css" rel="stylesheet" type="text/css" />
<link href="../css/twentytwenty.css" rel="stylesheet" type="text/css" />
<script src="../js/markdeep-1.13.min.js"></script>
<script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>
<script>$(window).load(function(){$(".twentytwenty-container").twentytwenty({default_offset_pct: 0.5});});</script>`);
