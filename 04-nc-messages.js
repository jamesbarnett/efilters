var lastMessageTimestamp = null;
var interval = 20 * 1000;

var sendNcMessage = function(msg) {
  var now = Date.now() / 1000;

  if (!lastMessageTimestamp) {
    lastMessageTimestamp = now;
  }

  if (now - lastMessageTimestamp > interval) {
    CometdRoom.sendMessage(msg);
    lastMessageTimestamp = now;
  }
}

