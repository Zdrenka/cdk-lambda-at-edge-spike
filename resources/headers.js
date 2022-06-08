"use strict";
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  console.log("received: " + JSON.stringify(headers));
  // clear out those pesky amp-'s
  Object.keys(headers).forEach(function (key) {
    if (key.startsWith("amp-")) {
      console.log("removing: " + headers[key].key);
      delete headers[key];
    }
  });
  console.log("adding new headers");
  //add new super cowboy USA hot dog rocket ship american header number one
  headers["x-karl-header"] = [
    {
      key: "X-Karl-Header",
      value: "heady mcheadface",
    },
  ];
  console.log(JSON.stringify(headers));
  callback(null, request);
};
