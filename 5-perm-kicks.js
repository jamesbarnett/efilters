var blacklisted = [ 'basil ^_^', 
                    'clutch ^~^',
                    'daily depresso',
                    'onewjo' ];

var permkick = function(x) {
  if (blacklisted.includes(x.data.username)) {
    kickAccountAndRemovePosts(x.data.userUuid);
  }
};

var permkickListener = $.cometd.addListener('/chatroom/user/joined/*', permkick);
