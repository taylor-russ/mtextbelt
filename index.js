var request = require('request');

/*  Send a text message to the provided
    phone number.

    Message limit details on http://textbelt.com

    Internal errors will be provided in first param
    of callback.

    Params:
      number: phone number to send to

      msg: text message which will be sent

      cb(err, result): callback to be called

*/
function send(number, msg, cb) {

  var body = "number="
             +number
             +"&message="
             +msg;

  var options = {
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: 'http://textbelt.com/text',
    body: body
  };

  request.post(options, function(err, resp, body){
    if (err) {
      cb(err, undefined);
    }

    else if (resp) {
      try {
        var payload = JSON.parse(body);
        cb(undefined, payload);
      }
      catch(e) {
        cb(e, undefined);
      }
    }

    else {
      cb(new Error('an unknown error occurred'), undefined);
    }

  });

}


module.exports = {
  send: send
};
