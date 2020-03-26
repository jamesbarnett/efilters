var _banDuration = 10 * 60 * 1000; // Ban accout for 10 minutes

var unbanAccount = function(userUuid, username) {
  CometdModerator.unbanAccount(userUuid);
  console.log("User " + username + " unbanned");
};

var scheduleUnban = function(userUuid, username) {
  console.log("Scheduling unban for user: " + username);
  setTimeout(unbanAccount, _banDuration, userUuid, username);
};

