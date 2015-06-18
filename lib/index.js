'use strict';

var proto = Anonymous.prototype;

function Anonymous(options) {
  if (!(this instanceof Anonymous)) {
    return new Anonymous(options);
  }
  this.endpoint = options.endpoint
    || 'http://webtracking.urad.com.tw/beacon';
}

proto.init = function (analytics, cb) {
  var script = document.createElement('script');

  window.urADAnalyticsAnonymousCallback = function (data) {
    script.parentElement.removeChild(script);
    analytics.user.cookieUID(data.cid);
    analytics.user.trackingUID(data.tid);
    cb();
  };

  script.async = 1;
  script.src = this.endpoint;
  script.type = 'text/javascript';
  document.body.appendChild(script);
};
