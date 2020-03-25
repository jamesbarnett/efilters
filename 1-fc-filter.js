// When we find someone bad, we kick them out and remove their posts
var kickAccountAndRemovePosts = function(userUuid) {
  CometdModerator.kickAccount(userUuid);
  CometdModerator.removeAccountMessages(userUuid);
};

// We don't want guests in FC... they cause most of the problems
var noGuests = function(x) {
  if (x.data.isGuest) {
    kickAccountAndRemovePosts(x.data.userUuid);
  }
};

// No F-bombs, N-Bombs, or C-Words in usernames
var noOffensiveNicks = function(x) {
  var ucUserName = x.data.username.toUpperCase();
  if (ucUserName.includes('FUCK') || ucUserName.includes('NIGGER') || 
      ucUserName.includes('NIGGA') || ucUserName.includes('CUNT') ||
      ucUserName.endsWith(":D")) {
    kickAccountAndRemovePosts(x.data.userUuid);
    console.log("Kicked user for offensive nick:" + x.data.username);
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
