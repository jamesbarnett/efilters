var blacklisted = [ 'Ac Is Back !',
                    'Action Bronsons Beard', 
                    'Age Is Just A Number',
                    'Axiom',
                    'basil ^_^', 
                    'bryngtr34sky', 
                    'Buzz!',
                    'clutch ^~^',
                    'daily depresso',
                    "Dirty's Fried Chicken",
                    'e x i l e',
                    'GettingBannedGetsMeOff',
                    'Godspeed Gears',
                    'I Am McLovin',
                    'I Shaved',
                    "I'll Teabag Ya",
                    'jafari1',
                    'James Corden',
                    'Johnny Dickshot',
                    'kyle is up in here',
                    'Kyle is up in here...',
                    'Lion2029',
                    'Lion2030',
                    'Lion2033',
                    'livelife',
                    'Mat 444',
                    'MilkTea',
                    'Moosemeyer',
                    'Nelson Muntz Haha',
                    'No More Beard', 
                    'ODB Reincarnated',
                    'onewjo',
                    'Party Boy !',
                    'Physica',
                    'Ricky LeFleur',
                    'Seiryu',
                    'Shermanator',
                    'Skipjack',
                    'stanislav',
                    'The Stiffmeister',
                    'TheReal Dick Shiner',
                    'Tommy Chongs Bong',
                    'Wallace Cleaver' ];

var permkick = function(x) {
  if (blacklisted.includes(x.data.username)) {
    kickAccountAndRemovePosts(x.data.userUuid);
  }
};

var permkickListener = $.cometd.addListener('/chatroom/user/joined/*', permkick);

