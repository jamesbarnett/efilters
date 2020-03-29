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

var tempBan = function(userUuid, username, banDuration) {
  var durationInMs = banDuration * 60 * 1000;

  CometdModerator.banAccount(userUuid);
  CometdModerator.removeAccountMessages(userUuid);
  console.log("Banning account " + username + ", " + userUuid);
  scheduleUnban(userUuid, username, durationInMs);
};

var findUserByNameHelper = function(username) {
  var user = null;

  $.ajax({
    url : '/search/users',
    method : 'POST',
    data : {
      name : username
    },
    success : function(jsonReply) { 
      var accounts = JSON.parse(jsonReply);
      var re = new RegExp(username + "\$");
      
      console.log("first search accounts: %O", accounts);

      if (accounts.length > 1) {
        accounts = accounts.filter(function(e) {
          return e.data.username.match(re);
        });
      }

      console.log("second search accounts: %O", accounts);

      if (accounts.length == 1) {
        user = accounts[0].data;
      } else if (accounts.length > 1) {
        console.log("Search for username " + username + " returned multiple results");
      } else {
        console.log("Search for username " + username + " return no results");
      }
    },
    error : function() {
      console.log("An error occurred.");
    }
  });

  return user;
};

var findUserByName = function(username) {
  let user = null;
  let tries = 0;
  let retries = 3;

  while (tries < retries && user == null) {
    user = findUserByNameHelper(username);
    ++tries;
  }

  return user;
};

/*
 * Call this function from the console to timeout a user.
 *   username - The user's nickname
 *   duration - Number of minutes to ban the user
 */
var timeoutUser = function(username, duration) {
  durationInMs = duration * 60 * 1000;
  var user = findUserByName(username); 
  
  if (user) {
    tempBan(user.userUuid, username, duration);
  } else {
    console.log('timeoutUser failed');
  }
};

/*
 * Call this function from the console to set an exipiration on a manual ban.
 *   username - The user's nickname
 *   duration - Number of minutes to ban the user
 */
var autoClearBan = function(username, duration) {
  var user = findUserByName(username);
  
  if (user) {
    scheduleUnban(username, user.userUuid, duration);
  } else {
    console.log("autoClearBan failed");
  }
};

