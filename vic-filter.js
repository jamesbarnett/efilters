var vicNicks = [
  'jejtghjedtgh',
  'rmnthsfgbh',
  'Powerhawk',
  'Powerhawk08',
  'invictus',
  'InvictusJPOA',
  'Invictus19',
  'Invictus02',
  'Sunnyside Up',
  'jigsaw',
  'Jigsaw3246',
  'JigsawKiller',
  'jigsaw2220',
  'Jigsaw and Beardy',
  'Jigsaw23',
  'rogerstar',
  'Dustrick'
].map(function(x) {
  x.toUpperCase();
});

var kickAccountAndRemoveMessages = function(userUuid) {
  CometdModerator.kickAccount(userUuid);
  CometdModerator.removeAccountMessages(userUuid);
}; 

/*
 * To add additional nicks at runtime, open the broswer console and type
 * `vicNicks.push('<newNick>');
 */
var vicFilter = function(x) {
  if (vicNicks.indexOf(x.data.username.toUpperCase()) != -1) {
    kickAccountAndRemoveMessages(x.data.userUuid);
    console.log('Kicked user ' + x.data.username);
  }
};

var emmaPleasFilter = function(x) {
  var post = x.data.messageBody.toUpperCase().replace(/ /g, '').replace(/,/g, '')
    .replace(/!/g, '').replace(/\./g, '');

  var vicPhrases = [
    'EMMAWENEEDTOTALK',
    'EMMAINEEDAMINUTE',
  ];

  if (vicPhrases.indexOf(post) != -1) {
    kickAccountAndRemoveMessages(x.data.userUuid);
    console.log('Kicked user ' + x.data.username);
  }
};

/*
 * To stop this filter, open the browser console and type
 * `$.cometd.removeListener(vicFilterListener);
 */
var vicFilterListener = $.cometd.addListener('/chatroom/user/joined/*', vicFilter);
var emmaPleasFilterListener = $.cometd.addListener('/chatroom/message/add/*', emmaPleasFilter);

