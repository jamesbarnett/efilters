var ncUserUuid = '5b1d27dc-c1a6-4b97-9107-1665881d654a';

var rulesMessage = "ROOM RULES:\n" + 
                   "1. Respect and tolerance\n" +
                   "2. No F-Bombs\n" +
                   "3. No Religion or Politics\n" + 
                   "4. No Soliciting\n" +
                   "5. Follow The Golden Rule: Treat other as you would like to be treated";

var commandProcessor = function(x) {
  if (x.data.userUuid == ncUserUuid && x.data.messageBody == '!rules') {
    CometdRoom.sendMessage(rulesMessage);
  }
};

var commandsListener = $.cometd.addListener('/chatroom/message/add/*', commandProcessor); 

