// Course navigation on top of page

// load a different font
// document.write('<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,100italic,300italic,400italic,700" rel="stylesheet" type="text/css">\n');

// load css first so the navbar doesn't flash
document.write('<link rel="stylesheet" type="text/css" href="../css/common.css?">\n');
document.write(
`<nav id="navbar">
    <span class="brand"></span>
    <span class="course">CS1</span>
    <ul class="nav-menu nav-center">
        <li><a href="../syllabus/">Syllabus</a></li>
        <li><a href="../schedule/">Schedule</a></li>
        <li><a id="assignments" href="../assignments/">Assignments</a>
        <ul>
            <li><a href="../sa00/">SA0</a></li>
            <li><a href="../sa01/">SA1</a></li>
            <li><a href="../sa02/">SA2</a></li>
            <li><a href="../sa03/">SA3</a></li>
            <li><a href="../sa04/">SA4</a></li>
            <li><a href="../sa05/">SA5</a></li>
            <li><a href="../sa06/">SA6</a></li>
            <li><a href="../sa07/">SA7</a></li>
            <li><a href="../sa08/">SA8</a></li>
            <li><a href="../sa09/">SA9</a></li>
            <li><a href="../lab01/">Lab1</a></li>
            <li><a href="../lab02/">Lab2</a></li>
            <li><a href="../lab03/">Lab3</a></li>
            <li><a href="../lab04/">Lab4</a></li>
        </ul>
        </li>
        <li><a href="http://projectpython.net">Text</a></li>
    </ul>
</nav>
`);

function selectActivePage() {
    const currentLocation = location.href;
    // special handling for nested short assignment and lab pages
    if (currentLocation.match(/(sa\d{2})|(lab\d{2})/)) {
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

document.write( '<!-- Markdeep: -->' +
                // '<style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style>' +
                '<script src="../js/markdeep.min.js"></script>' +
                '<script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>\n'
                );

// document.write( '<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,100italic,300italic,400italic,700" rel="stylesheet" type="text/css">\n' + 
//                 '<link rel="stylesheet" type="text/css" href="../css/common.css">\n' + 
//                 '<!-- Markdeep: --><style class="fallback">body{visibility:hidden}</style><script src="https://morgan3d.github.io/markdeep/latest/markdeep.min.js?" charset="utf-8"></script>'
//                 );
