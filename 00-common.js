// When we find someone bad, we kick them out and remove their posts
var kickAccountAndRemovePosts = function(userUuid) {
  CometdModerator.kickAccount(userUuid);
  CometdModerator.removeAccountMessages(userUuid);
};

var unbanAccount = function(userUuid, username) {
  CometdModerator.unbanAccount(userUuid);
  console.log("User " + username + " unbanned");
};

var scheduleUnban = function(userUuid, username, banDuration) {
  console.log("Scheduling unban for user: " + username);
  setTimeout(unbanAccount, banDuration, userUuid, username);
};

var timeoutDan = function(duration) {
  var dansUuids = [ "fe340c0b-73c0-4d0a-b3c4-a1d646082969",
                    "e1c83d8b-e110-42a5-9127-b4b8cdff44fb" ];

  dansUuids.forEach(function(uuid) {
    CometdModerator.banAccount(dansUuid);
    scheduleUnban(uuid, "Dan", duration * 1000 * 60);
  });
};

