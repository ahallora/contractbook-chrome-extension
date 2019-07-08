"use strict";

let inputRegexp = /(\[fb:)([A-Z]\w+)(\])/gi;
let fieldsRegexp = /\[fb:[A-Z]\w+\]/gi;
let fb_editor = document.querySelector("#editor_content");
let fb_btn = document.querySelector("#convert_btn");

function replaceTagsWithInputs(str) {
  let newstr = str.replace(inputRegexp, (match, p1, p2) => {
    return (
      '<input name="' +
      p2.toLowerCase() +
      '" type="text" value="" placeholder="[' +
      p2 +
      ']" data-contract-editable="true" />'
    );
  });
  return newstr;
}

function copyToClip(str) {
  // credits: https://stackoverflow.com/a/50067769/4893390
  let listener = e => {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  };

  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

function convertToFormat(e) {
  if (e) e.preventDefault();
  copyToClip(replaceTagsWithInputs(fb_editor.innerHTML));
  outputDeveloperObject();
  changeButtonState();
  //fb_editor.innerHTML = "";
}

function changeButtonState() {
  fb_btn.innerText = "Done - Copied to clipboard";
  fb_btn.classList.add("done");
  fb_btn.disabled = true;
  window.setTimeout(function() {
    fb_btn.innerText = "Convert";
    fb_btn.classList.remove("done");
    fb_btn.disabled = false;
  }, 3500);
}

function outputDeveloperObject() {
  let str = fb_editor.innerHTML;
  let fields = str.match(fieldsRegexp);
  let strObj = {};
  if (fields) {
    fields
      .map(x => x.replace(inputRegexp, (match, p1, p2) => p2.toLowerCase()))
      .forEach(x => {
        return (strObj[x] = "");
      });

    console.log(JSON.stringify(strObj, null, 2));
  }
}

fb_btn.addEventListener("click", convertToFormat);
//fb_editor.addEventListener('paste', function(e) { window.setTimeout(convertToFormat, 500) });

!(function(f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, "script", "//connect.facebook.net/en_US/fbevents.js");
fbq("init", "455557878341857");
fbq("init", "1611683679131907");
fbq("track", "PageView");
