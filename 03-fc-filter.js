// We don't want guests in FC... they cause most of the problems
var noGuests = function(x) {
  if (x.data.isGuest) {
    kickAccountAndRemovePosts(x.data.userUuid);
  }
};

var reRword = /\bRAPE/;
var rePword = /\bPEDO(FILE)?\b/;
var reEquals = /\s=\s/;
var reTargets = /(VOLATILE=|MSTSP=|TSP=)/;

const fword = String.fromCharCode(70, 85, 67, 75);
const nword1 = String.fromCharCode(78, 73, 71, 71, 69, 82);
const nword2 = String.fromCharCode(78, 73, 71, 71, 65);
const _cword = String.fromCharCode(67, 85, 78, 84);


String.fromCharCode(78, 73, 71, 71, 69, 82);
// No F-bombs, N-Bombs, or C-Words in usernames
var noOffensiveNicks = function(x) {
  var ucUserName = x.data.username.toUpperCase();
  if (ucUserName.includes(fword) || ucUserName.includes(nword1) ||
      ucUserName.includes(nword2) || ucUserName.includes(_cword) ||
      ucUserName.endsWith(":D") || ucUserName.match(reRword) ||
      ucUserName.match(rePword) || ucUserName.match(reEquals) ||
      ucUserName.match(reTargets)) {
    kickAccountAndRemovePosts(x.data.userUuid);
    console.log(`Kicked user for offensive nick: #{x.data.username}`);
  }
};

// This is the function that actually monitors the room
var fcFilter = function(x) {
  noGuests(x);
  noOffensiveNicks(x);
};

// This makes are event listener actually listen
// To stop this filter, run `$.cometd.removeListener(fcFilterListener)`
var fcFilterListener = $.cometd.addListener('/chatroom/user/joined/*', fcFilter);
