(function () {
  "use strict";

  var root = document.documentElement;
  var darkMode = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      return window.localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function setTheme(theme) {
    var useDark = theme === "dark";
    if (useDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    var icon = document.getElementById("theme-icon");
    if (icon) {
      icon.classList.toggle("fa-moon", useDark);
      icon.classList.toggle("fa-sun", !useDark);
    }
  }

  function preferredTheme() {
    return savedTheme() || (darkMode.matches ? "dark" : "light");
  }

  setTheme(preferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var theme = root.hasAttribute("data-theme") ? "light" : "dark";
        try {
          window.localStorage.setItem("theme", theme);
        } catch (error) {
          // The selected theme still applies when storage is unavailable.
        }
        setTheme(theme);
      });
    }

    var authorButton = document.querySelector(".author__urls-wrapper button");
    var authorLinks = document.querySelector(".author__urls");
    if (authorButton && authorLinks) {
      authorButton.addEventListener("click", function () {
        var opening = window.getComputedStyle(authorLinks).display === "none";
        authorLinks.style.display = opening ? "block" : "none";
        authorButton.classList.toggle("open", opening);
        authorButton.setAttribute("aria-expanded", String(opening));
      });
    }

    var nav = document.getElementById("site-nav");
    if (!nav) return;

    var navButton = nav.querySelector("button");
    var visibleLinks = nav.querySelector(".visible-links");
    var hiddenLinks = nav.querySelector(".hidden-links");
    var tail = visibleLinks.querySelector(".persist.tail");
    var breaks = [];

    function availableWidth() {
      return nav.clientWidth - (navButton.classList.contains("hidden") ? 0 : navButton.offsetWidth + 30);
    }

    function sizeFooter() {
      var footer = document.querySelector(".page__footer");
      if (!footer) return;
      var style = window.getComputedStyle(footer);
      var height = footer.offsetHeight + parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
      document.body.style.marginBottom = height + "px";
    }

    function updateNavigation() {
      var available = availableWidth();

      while (visibleLinks.scrollWidth > available) {
        var movable = Array.from(visibleLinks.children).filter(function (item) {
          return !item.classList.contains("persist");
        }).pop();
        if (!movable) break;

        breaks.push(visibleLinks.scrollWidth);
        hiddenLinks.insertBefore(movable, hiddenLinks.firstChild);
        navButton.classList.remove("hidden");
        available = availableWidth();
      }

      while (breaks.length && available > breaks[breaks.length - 1]) {
        var item = hiddenLinks.firstElementChild;
        if (!item) break;
        visibleLinks.insertBefore(item, tail);
        breaks.pop();
        available = availableWidth();
      }

      if (!breaks.length) {
        navButton.classList.add("hidden");
        navButton.classList.remove("close");
        hiddenLinks.classList.add("hidden");
        navButton.setAttribute("aria-expanded", "false");
      }

      navButton.setAttribute("count", String(breaks.length));

      var masthead = document.querySelector(".masthead");
      var sidebar = document.querySelector(".sidebar");
      if (masthead) document.body.style.paddingTop = masthead.offsetHeight + "px";
      if (sidebar && masthead) {
        sidebar.style.paddingTop = window.innerWidth >= 1024 ? masthead.offsetHeight + "px" : "";
      }

      if (authorButton && authorLinks) {
        if (window.innerWidth >= 925 && window.getComputedStyle(authorLinks).display === "none") {
          authorLinks.style.display = "block";
        } else if (window.innerWidth < 925 && !authorButton.classList.contains("open")) {
          authorLinks.style.removeProperty("display");
        }
      }
    }

    navButton.addEventListener("click", function () {
      var opening = hiddenLinks.classList.contains("hidden");
      hiddenLinks.classList.toggle("hidden");
      navButton.classList.toggle("close");
      navButton.setAttribute("aria-expanded", String(opening));
    });

    var resizePending = false;
    window.addEventListener("resize", function () {
      if (resizePending) return;
      resizePending = true;
      window.requestAnimationFrame(function () {
        updateNavigation();
        sizeFooter();
        resizePending = false;
      });
    });

    if (screen.orientation && screen.orientation.addEventListener) {
      screen.orientation.addEventListener("change", updateNavigation);
    }

    updateNavigation();
    sizeFooter();
    window.addEventListener("load", function () {
      updateNavigation();
      sizeFooter();
    });
  });

  if (darkMode.addEventListener) {
    darkMode.addEventListener("change", function (event) {
      if (!savedTheme()) setTheme(event.matches ? "dark" : "light");
    });
  }
})();
