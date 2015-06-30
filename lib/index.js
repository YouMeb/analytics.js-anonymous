'use strict';

var proto = Anonymous.prototype;

module.exports = Anonymous;

function Anonymous(options) {
  if (!(this instanceof Anonymous)) {
    return new Anonymous(options);
  }
  this._endpoint = options.endpoint
    || 'http://webtracking.urad.com.tw/beacon';
}

proto.endpoint = function (cid) {
  return this._endpoint
    + '?callback=urADAnalyticsAnonymousCallback'
    + (cid ? '&cid=' + cid : '');
};

proto.init = function (analytics, cb) {
  var script = document.createElement('script');

  window.urADAnalyticsAnonymousCallback = function (data) {
    script.parentElement.removeChild(script);
    analytics.user.setCookieUID(data.cid);
    analytics.user.setTrackingUID(data.tid);
    cb();
  };

  script.async = 1;
  script.src = this.endpoint(analytics.user.cookieUID());
  script.type = 'text/javascript';
  document.body.appendChild(script);
};
