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

var scheduleUnban = function(userUuid, username, banDuration) {
  console.log("Scheduling unban for user: " + username);
  setTimeout(unbanAccount, banDuration, userUuid, username);
};

var tempBan = function(userUuid, username, banDuration) {
  var durationInMs = banDuration * 60 * 1000;

  CometdModerator.banAccount(userUuid);
  console.log("Banning account " + username + ", " + userUuid);
  scheduleUnban(userUuid, username, durationInMs);
};

var findUserByName = function(username) {
  var user = null;

  var re = new RegExp(username + "\$");

  $.ajax({
    url : '/search/users',
    method : 'POST',
    data : {
      name : username
    },
    success : function(jsonReply) { 
      var accounts = JSON.parse(jsonReply);
      
      accounts = accounts.filter(function(e) {
        return e.data.username.match(re);
      });

      if (accounts.length == 1) {
        user = accounts[0].data;
      } else {
        console.log("Search for username " + username + " returned multiple results");
      }
    },
    error : function() {
      console.log("An error occurred.");
    }
  });

  return user;
};

/*
 * Call this function from the console to timeout a user.
 *   username - The user's nickname
 *   duration - Number of minutes to ban the user
 */
var timeoutUser = function(username, duration) {
  durationInMs = duration * 60 * 1000;
 
  var re = new RegExp(username + "\$");

  // need to lookup account
  $.ajax({
    url : '/search/users',
    method : 'POST',
    data : {
      name : username
    },
    success : function(jsonReply) { 
      var accounts = JSON.parse(jsonReply);
      
      accounts = accounts.filter(function(e) {
        return e.data.username.match(re);
      });

      if (accounts.length == 1) {
        var userUuid = accounts[0].data.userUuid;
        tempBan(userUuid, username, duration);
      } else {
        console.log("Search for username " + username + " returned multiple results");
      }
    },
    error : function() {
      console.log("An error occurred.");
    }
  });
};

var autoClearBan = function(username, duration) {
  var user = findUserByName(username);
  scheduleUnban(username, user.userUuid, duration);
};

