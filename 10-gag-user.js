var gaggedUsers = [];

var gagUser = function(nick, duration) {
  var user = findUserByName(nick);
  // console.log("gagUser: user %O", user); 

  gaggedUsers.push(user);
  scheduleExpireGag(user, duration); 
};

var findGaggedUser = function(username) {
  return gaggedUsers.find((u) => u.username == username);
};

var gagUserFilter = function(user) { 
  /* console.log("gagUserFilter called: user: %O", user.data);
  console.log("gaggedUsers found user? %O", findGaggedUser(user.data.username));
  console.log("gaggedUsers: %O", gaggedUsers); */

  if (findGaggedUser(user.data.username)) {
    console.log("gagUserFilter: removing posts from gagged user: %O", user.data.username);
    CometdModerator.removeAccountMessages(user.data.userUuid);
  }
};

var expireGag = function(user) {
  gaggedUsers.splice(gaggedUsers.indexOf(user), 1);
  console.log(`Removing gag from user: ${user.data.username}`);
};

var scheduleExpireGag = function(user, duration) {
  console.log("scheduleExpireGag: user: %O", user);
  setTimeout(expireGag, duration * 60 * 1000, user.userUuid);
};

var gagUserFilterListener = $.cometd.addListener('/chatroom/message/add/*', gagUserFilter);

