
define(['mule-sdk'], function (sdk) {
  var SDK = sdk('http://zion.tgp.io:313/webservices/');

  console.log('sdk should not be undefined', sdk);
  console.log('SDK should not be undefined', SDK);
});
