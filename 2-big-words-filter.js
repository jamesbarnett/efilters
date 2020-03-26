var delayInterval = 15; // The interval in seconds
var fbomb = 1;
var nbomb = 2;
var pbomb = 3;
var bigWordsViolationLedger = {};
var expireInterval = 300; // 5 minutes not sure about that
var lastWarningTimestamp = null;
var pedoFilter = /\bPEDO\b/;

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
    CometdRoom.sendMessage("We don't accuse people of that here, " + username);
  }
};

var addViolation = function(username, timestamp) {
  if (bigWordsViolationLedger[username] == null) {
    bigWordsViolationLedger[username] = [];
  }

  bigWordsViolationLedger[username].unshift(timestamp);
};
  
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

var countViolations = function(username) {
  return bigWordsViolationLedger[username].length > 2;
};

var unbanAccount = function(userUuid, username) {
  CometdModerator.unbanAccount(userUuid);
  console.log("User " + username + " unbanned");
};

var _banDuration = 10 * 60 * 1000;

var scheduleUnban = function(userUuid, username) {
  console.log("Scheduling unban for user: " + username);
  setTimeout(unbanAccount, _banDuration, userUuid, username);
};

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

  if (ts - lastWarningTimestamp > delayInterval) {
    issueWarning(warningType, username, ts);
    lastWarningTimestamp = Date.now() / 1000;
  }
};

var bigWordsFilter = function(x) {
  var message = x.data.messageBody.toUpperCase();

  if (message.includes('FUCK')) {
    checkWarningAndViolations(fbomb, x);
  } else if (message.includes('NIGGER') || message.includes('NIGGA')) {
    checkWarningAndViolations(nbomb, x);
  } else if (message.match(pedoFilter)) {
    checkWarningAndViolations(pbomb, x);
  }
};

/*
 * To stop this filter type into the console, $.cometd.removeListener(fBombFilterListener);
 */
var bigWordsFilterListener = $.cometd.addListener('/chatroom/message/add/*', bigWordsFilter);


