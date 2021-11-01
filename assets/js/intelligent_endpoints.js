(function () {
  var mountEl = document.getElementById('ai-docs-root');
  var iFrameEl = document.createElement('iframe');
  var iFrameSrc = 'http://localhost:5000';

  document.addEventListener('DOMContentLoaded', ready);

  function ready() {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', iFrameSrc, true);
    xhr.onload = onLoad;
    xhr.onerror = onError;
    xhr.send(null);

    function onLoad() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          iFrameEl.src = iFrameSrc;
          iFrameEl.style.border = 0;
          iFrameEl.style.height = window.innerHeight - 150 + 'px';
          iFrameEl.style.width = '100%';
          mountEl.appendChild(iFrameEl);
        } else {
          onError();
        }
      }
    }

    function onError() {
      var contentEl = document.createElement('p');
      contentEl.innerText =
        'The content you are trying to view is not available.';
      mountEl.appendChild(contentEl);
    }
  }
})();
