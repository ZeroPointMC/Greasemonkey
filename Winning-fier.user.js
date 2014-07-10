// ==UserScript==
// @name        Winning-fier
// @namespace   zeropoint
// @description Appends the line "And then we banged." to all fimfiction.net story chapters.
// @include     http://www.fimfiction.net/story/*
// @version     1.3.0
// @grant       none
// ==/UserScript==

$(function() {
	// Script metadata
	var self = {
		name: GM_info.script.name,
		version: (GM_info.script.version || "1.0"),
		title: GM_info.script.name + " V" + (GM_info.script.version || "1.0")
	};
	var title = "This line was inserted by the " + self.title + " SexyTimes Story Modifier - " + (location.pathname.match(/\/story\/28239\/\d+(\/.*)?/i) ? "oddly enough, " : "") + "it is not part of the actual story";
	// ALL CONSOLE OUTPUT IS USED FOR DEBUGGING PURPOSES
	try {
		if (!console) {
			console.log = console.info = console.warn = console.error = console.group = console.groupCollapsed = console.groupEnd = console.exception = function(){};
		}
	}
	catch (e) {}
	try {
		console.groupCollapsed(self.name);
		console.info(self.title + " enabled!");
		// This regex ensures that we only affect chapter pages
		if (!location.pathname.match(/\/story\/\d+\/\d+(\/.*)?/i)) {
			console.error("SexyTimes disabled - not on a chapter page");
			console.groupEnd();
			return;
		}
		// And this one ensures that we can FIND the chapter (getElementById() returns null is no matching element could be found)
		else if (!document.getElementById("chapter_container")) {
			console.error("SexyTimes disabled - can't find chapter container");
			console.groupEnd();
			return;
		}
		// This block runs if we are on a chapter page AND have found the actual chapter.
		else {
			var c = $('div#chapter_container').last();
			// The regex on the next line is used to check if the chapter already ends with the line we want to append.
			// If the story ends with SOME FORM OF "and then we banged"...
			if (c.text().match(/and\s+then\s+we\s+banged.{0,3}\s*$/i)) {
				// ... tell the user about it
				console.error("SexyTimes disabled - chapter already ends with 'and then we banged' (or some variant thereof)");
			}
			// If the story does NOT end with some form of "and then we banged"...
			else {
				// ... tell the user that we're active ...
				console.warn("SexyTimes enabled!");
				// ... create the <p> tag ...
				var e = $(document.createElement('p'));
				// ... add the class that fimfic uses to space the paragraphs out ...
				e.addClass('double');
				// ... include an indicator to show that the line is ours ...
				e.attr('title', title);
				// ... change the cursor when hovering over the line ...
				e.css('cursor', 'default');
				// ... set the actual line ...
				e.text('And then we banged.');
				// ... and add it to the chapter!
				c.append(e);
			}
			console.groupEnd();
		}
	}
	catch (e) {
		console.error(self.title + " has encountered an error!");
		console.group("Exception Trace");
		console.exception(e);
		console.groupEnd();
		console.groupEnd();
	}
});

