var removeListeners = function() {
  $.cometd.removeListener(fcFilterListener);
  $.cometd.removeListener(bigWordsFilterListener);
  $.cometd.removeListener(gihFilterListener);
  $.cometd.removeListener(vicFilterListener); 
};


