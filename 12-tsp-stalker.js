var tspStalkerFilter = function(x) {
  var prunedMsg = x.data.messageBody.toUpperCase().replace(/\,/);

  if (prunedMsg.match(/\b(MS)TSP\b/) && prunedMsg.match(/\bDAY(\s)d+\b/)) {
    CometdModerator.removeAccountMessages(x.user.userUuid);
  }
};

var tspStalkerFilterListener = $.cometd.addListener('/chatroom/message/add', tspStalkerFilter);
