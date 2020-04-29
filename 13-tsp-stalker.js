var tspStalkerFilter = function(x) {
  var prunedMsg = x.data.messageBody.toUpperCase().replace(/\,/).replace('#', '');

  console.log("Matched 1st: %O", prunedMsg.match(/(MS)?TSP/));
  console.log("Matched 2nd: %O", prunedMsg.match(/\bDAY(\s)?\d+\b/));

  if (prunedMsg.match(/(MS)?TSP/) && prunedMsg.match(/\bDAY(\s)?\d+\b/)) {
    CometdModerator.removeAccountMessages(x.data.userUuid);
  }
};

var tspStalkerFilterListener = $.cometd.addListener('/chatroom/message/add/*', tspStalkerFilter);

