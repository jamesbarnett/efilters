var tspStalkerFilter = function(x) {
  var prunedMsg = x.data.messageBody.toUpperCase().replace(/\,/).replace('#', '');

  if (prunedMsg.match(/(MS)?TSP/) && prunedMsg.match(/\bDAY(\s)?\d+\b/)) {
    CometdModerator.removeAccountMessages(x.data.userUuid);
  }
};

var tspStalkerFilterListener = $.cometd.addListener('/chatroom/message/add/*', tspStalkerFilter);

