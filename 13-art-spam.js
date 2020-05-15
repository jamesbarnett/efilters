var artSpamFilter = function(x) {
  var msg = x.data.messageBody;

  if (msg.codePointAt(0) == 9616 && msg.codePointAt(1) == 9608 && msg.codePointAt(2) == 9604) {
    CometdModerator.removeAccountMessages(x.data.userUuid);
    CometdModerator.kickAccount(x.data.userUuid);
  }

  /* for (var i = 0; i < 3; ++i) {
    console.log(x.data.messageBody.codePointAt(i));
  } */
};

var artSpamFilterListener = $.cometd.addListener('/chatroom/message/add/*', artSpamFilter);
