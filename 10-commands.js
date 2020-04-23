var ncUserUuid = '5b1d27dc-c1a6-4b97-9107-1665881d654a';

var rulesMessage = [ "ROOM RULES:",
                     "1. Respect and tolerance",
                     "2. No F-Bombs",
                     "3. No Religion or Politics",
                     "4. No Soliciting",
                     "5. Follow The Golden Rule: Treat other as you would like to be treated"
                   ];

var commandProccessor = function(x) {
  if (x.data.userUuid == ncUserUuid && x.data.messageBody == '!rules') {
    rulesMessage.forEach((rule) => CometdRoom.sendMessage(rule));
  }
};

var commandsListener = $.cometd.addListener('/chatroom/message/add/*', commandProccesor); 
