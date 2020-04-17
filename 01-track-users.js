var usersInRoom = [];

// monitor room joined and room left events
var trackUserJoin = function(x) {
  delete x.data.timestamp;

  console.log("trackUsers: adding %O", x.data.username);

  if (!usersInRoom.find((x) => e.username == x.data.username )) {
    usersInRoom.push(x.data);
  }
};

var trackUserJoinListener = $.cometd.addListener('/chatroom/user/joined/*', trackUserJoin);

