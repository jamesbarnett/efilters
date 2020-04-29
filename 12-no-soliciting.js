var reRoom = /room\/\d{8}/;

var noSolicitingFilter = function(x) {
  if (x.data.messageBody.match(reRoom)) {
    CometdModerator.removeAccountMessages(x.data.userUuid); 
  }
};

var noSoliticingFilterListener = $.cometd.addListener(
  '/chatroom/message/add/*', noSolicitingFilter);

