var gihPhrases = [/\bRAPE A BABY/, /\bRAPE BABIES/, /\bRAPES\b/, /\bRAPED\b/];

var checkGihMessages = function(message) {
  var uc = message.toUpperCase();
 
  var result = null;
  gihPhrases.find(function(phrase) {
    result = uc.match(phrase) || result;
  });

  return result;
};

var gihFilter = function(x) {
  var message = x.data.messageBody.toUpperCase();

  if (checkGihMessages(message)) {
    CometdModerator.kickAccount(x.data.userUuid);
    console.log("GiHFilter: kicking user: " + x.data.username);
    CometdModerator.removeAccountMessages(x.data.userUuid);
  }
};

/*
 * To stop this filter, type into the console $.cometd.removeListener(gihFilterListener);
 */
var gihFilterListener = $.cometd.addListener('/chatroom/message/add/*', gihFilter);


