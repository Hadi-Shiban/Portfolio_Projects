/*
  main.js: fills in site-wide text from config.js and runs the scroll reveals.
  No libraries. Everything here is optional: without JS the pages still show
  all content, just without the gentle fade-in.
*/
(function () {
  "use strict";

  // 1. Fill in business name, tagline, contact, etc. from config.js
  var site = window.SITE || {};
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var value = site[el.getAttribute("data-site")];
    if (value) el.textContent = value;
  });
  if (site.businessName) {
    document.title = document.title.replace("[BUSINESS NAME]", site.businessName);
  }

  // Current year in the footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // 2. Scroll reveals. Skip entirely if the visitor prefers reduced motion
  //    or the browser lacks IntersectionObserver: content just stays visible.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  // Only now do we allow CSS to hide things before they animate in.
  document.documentElement.classList.add("motion-ok");

  // Split [data-reveal-words] elements into word spans so they appear in sequence.
  document.querySelectorAll("[data-reveal-words]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      span.style.transitionDelay = Math.min(i * 45, 900) + "ms";
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  // Children of [data-reveal-stagger] (e.g. list items) appear one after another.
  document.querySelectorAll("[data-reveal-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.transitionDelay = i * 110 + "ms";
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once, then leave it be
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".reveal, [data-reveal-words]")
    .forEach(function (el) { observer.observe(el); });
})();
