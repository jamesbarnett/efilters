var tempBan = function(userUuid, username, banDuration) {
  var durationInMs = banDuration * 60 * 1000;
  CometdModerator.removeAccountMessages(userUuid);
  console.log(`Banning account ${username}, ${userUuid}`);
  scheduleUnban(userUuid, username, durationInMs);
};

var findUserByName = function(username) {
  return usersInRoom.find((u) => u.username == username);
};

async function findUserBySearch(username) {
  let user;

  try {
    const jsonReply = await $.ajax({
      url: '/search/users',
      method: 'POST',
      data: { name : username }
    });

    console.log("jsonReply: %O", jsonReply);

    return jsonReply;
  } catch { }
}

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

