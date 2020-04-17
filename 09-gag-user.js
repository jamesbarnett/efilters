var gaggedUsers = [];

var gagUser = function(nick, duration) {
  var user = findUserByName(nick);
  console.log("gagUser: user %O", user); 

  gaggedUsers.push(user);
  scheduleExpireGag(user, duration); 
};

var gagUserFilter = function(user) { 
  console.log("gagUserFilter called: user: %O", user);

  if (gaggedUsers.includes(user)) {
    console.log("gagUserFilter: removing posts from gagged user: %O", user);
    CometDModerator.removeAccountMessages(user.userUuid);
  }
};

var expireGag = function(user) {
  gaggedUsers.splice(gaggedUsers.indexOf(user), 1);
};

var scheduleExpireGag = function(user, duration) {
  console.log("scheduleExpireGag: user: %O", user);
  setTimeout(expireGag, duration * 60 * 1000, user.userUuid);
};

var gagUserFilterListener = $.cometd.addListener('/chatroom/message/add/*', gagUserFilter);

