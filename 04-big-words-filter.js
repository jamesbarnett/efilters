var delayInterval = 15; // The interval in seconds
var fbomb = 1;
var nbomb = 2;
var pbomb = 3;
var cword = 4;
var rword = 5;
var bigWordsViolationLedger = {};
var expireInterval = 5 * 60; // 5 minutes not sure about that
var lastWarningTimestamp = null;
var pedoFilter = /\bPEDOS?\b/;
var rwordFilter = /\bR[A@]PE[SD]?\b/;

var checkWarningAndViolations = function(warningType, x) {
  CometdModerator.removeAccountMessages(x.data.userUuid);
  checkLastWarning(warningType, x.data.username, x.data.userUuid);
};

var issueWarning = function(warningType, username, userUuid) {
  if (warningType == fbomb) {
    CometdRoom.sendMessage("Language please, " + username + ", no F-Bombs here.");
  } else if (warningType == nbomb) {
    CometdRoom.sendMessage("Language please, " + username + ", no N-words here.");
  } else if (warningType == pbomb) {
    CometdRoom.sendMessage("We don't discuss that topic, " + username);
  } else if (warningType == cword) {
    CometdRoom.sendMessage("Language please, " + username + ", no C-words here.");
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
  console.log("lastWarningTimestamp: " + lastWarningTimestamp + ", Date.now() " + Date.now() / 1000);
  var ts = Date.now() / 1000;

  manageViolationLedger(username, ts);

  if (countViolations(username)) {
    console.log("bigWordFilter: kicking username: " + username);
    // CometdModerator.kickAccount(userUuid);
    CometdModerator.banAccount(userUuid);
    scheduleUnban(userUuid, username);
  }

  // Trying to keep trolls from using NC's warnings to spam
  if (ts - lastWarningTimestamp > delayInterval) {
    issueWarning(warningType, username, ts);
    lastWarningTimestamp = Date.now() / 1000;
  }
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


