var delayInterval = 20; // The interval in seconds
var fbomb = 1;
var nbomb = 2;
var pbomb = 3;
var cword = 4;
var rword = 5;
var bigWordsViolationLedger = {};
var expireInterval = 5 * 60; // 5 minutes not sure about that
var pedoFilter = /\bPEDOS?\b/;
var rwordFilter = /\bR[A@]PE[SD]?\b/;

var checkWarningAndViolations = function(warningType, x) {
  CometdModerator.removeAccountMessages(x.data.userUuid);
  checkLastWarning(warningType, x.data.username, x.data.userUuid);
};

var issueWarning = function(warningType, username, userUuid) {
  if (warningType == fbomb) {
    sendNcMessage("Language please, " + username + ", no F-Bombs here.");
  } else if (warningType == nbomb) {
    sendNcMessage("Language please, " + username + ", no N-words here.");
  } else if (warningType == pbomb) {
    sendNcMessage("We don't discuss that topic, " + username);
  } else if (warningType == cword) {
    sendNcMessage("Language please, " + username + ", no C-words here.");
  }
};

// keeps track of infractions
var addViolation = function(username, timestamp) {
  if (bigWordsViolationLedger[username] == null) {
    bigWordsViolationLedger[username] = [];
  }

  bigWordsViolationLedger[username].unshift(timestamp);
};
  
// Removes offenses older than the expire interval
var expireViolations = function(username) {
  var now = Date.now() / 1000;
  
  bigWordsViolationLedger[username] = bigWordsViolationLedger[username].filter(function(e) {
    return e - now < expireInterval;
  });
};

var manageViolationLedger = function(username, timestamp) {
  addViolation(username, timestamp);
  expireViolations(username);
};

// Checks to see if user has violated the 3 strike rule
var countViolations = function(username) {
  return bigWordsViolationLedger[username].length > 2;
};

// Trying to keep trolls from using NC's warnings to spam
var checkLastWarning = function(warningType, username, userUuid) {
  var ts = Date.now() / 1000;

  manageViolationLedger(username, ts);

  if (countViolations(username)) {
    // CometdModerator.kickAccount(userUuid);
    CometdModerator.banAccount(userUuid);
    scheduleUnban(userUuid, username, 2);
  }

  issueWarning(warningType, username, ts);
};

var bigWordsFilter = function(x) {
  var message = x.data.messageBody.toUpperCase().replace(/\./g, '');

  if (message.includes('FUCK')) {
    checkWarningAndViolations(fbomb, x);
  } else if (message.includes('NIGGER') || message.includes('NIGGA')) {
    checkWarningAndViolations(nbomb, x);
  } else if (message.match(pedoFilter)) {
    checkWarningAndViolations(pbomb, x);
  } else if (message.match(rwordFilter)) {
    checkWarningAndViolations(rword, x);
  } else if (message.includes('CUNT')) {
    checkWarningAndViolations(cword, x);
  }
};

/*
 * To stop this filter type into the console, $.cometd.removeListener(fBombFilterListener);
 */
var bigWordsFilterListener = $.cometd.addListener('/chatroom/message/add/*', bigWordsFilter);


