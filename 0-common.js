var _banDuration = 10 * 60 * 1000; // Ban accout for 10 minutes

// When we find someone bad, we kick them out and remove their posts
var kickAccountAndRemovePosts = function(userUuid) {
  CometdModerator.kickAccount(userUuid);
  CometdModerator.removeAccountMessages(userUuid);
};

var unbanAccount = function(userUuid, username) {
  CometdModerator.unbanAccount(userUuid);
  console.log("User " + username + " unbanned");
};

var scheduleUnban = function(userUuid, username) {
  console.log("Scheduling unban for user: " + username);
  setTimeout(unbanAccount, _banDuration, userUuid, username);
};

var tempBan = function(userUuid, username) {
  CometdModerator.banAccount(userUuid);
  scheduleUnban(userUuid, username);
};

