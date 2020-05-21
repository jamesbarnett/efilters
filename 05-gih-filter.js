var gihPhrases = [/\bRAPE A BABY/, /\bRAPE BABIES/, /\bRAPES\b/, /\bRAPED\b/, /\bRαPED?\b/];
var gihChars = [56384, 56389, 56438, 56442];

var checkGihChars = function(message) {
  for (var i = 0; i < message.length; ++i) {
    if (gihChar.includes(message.charCodeAt(i))) {
      return true;
    }
  }
};

var checkGihMessages = function(message) {
  var uc = message.toUpperCase().replace(/\./g, '').replace(/,/, '');

  var result = null;
  gihPhrases.find(function(phrase) {
    result = uc.match(phrase) || result;
  });

  return result;
};

var gihFilter = function(x) {
  var message = x.data.messageBody.toUpperCase();

  if (checkGihMessages(message) || checkGihChars(message)) {
    CometdModerator.kickAccount(x.data.userUuid);
    console.log("GiHFilter: kicking user: " + x.data.username);
    CometdModerator.removeAccountMessages(x.data.userUuid);
    console.log("GihFilter: banning account " + x.data.username);
    // CometdModerator.banAccount(x.data.userUuid, x.data.username);
    setTimeout(unbanAccount, _banDuration, x.data.userUuid, x.data.username);
  }
};

/*
 * To stop this filter, type into the console $.cometd.removeListener(gihFilterListener);
 */
var gihFilterListener = $.cometd.addListener('/chatroom/message/add/*', gihFilter);


