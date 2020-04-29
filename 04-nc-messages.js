var lastMessageTimestamp = null;
var interval = 20;

var sendNcMessage = function(msg) {
  var now = Date.now() / 1000;
  console.log("sendNcMessage: now - lastMessageTimestamp: %O", now - lastMessageTimestamp);

  if (!lastMessageTimestamp) {
    lastMessageTimestamp = now;
    CometdRoom.sendMessage(msg);
  } else if (now - lastMessageTimestamp > interval) {
    CometdRoom.sendMessage(msg);
    lastMessageTimestamp = now;
  }
};

