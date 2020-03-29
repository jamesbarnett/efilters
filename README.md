# Efilters

Set of scripts to protect an e-chat from bad actors and bad behavior

1. [Getting Started](#getting-started)
2. [Tablet and Mobile Users](#tablet-and-mobile-users)
3. [Running EFliters](#running-efilters)
4. [Advanced](#advanced)
## Getting Started

TBD

## Tablet and Mobile Users

Unfortunately, unless you are on an iPad, I don't think there is an easy was to 
run the shields. If you find a way to access browser developer tools, please 
contact me (Volatile4342) so that I may share the information here.

## Running EFilters

First, copy the contents of the file fc-master-filter.js to the clipboard.
Then in your moderator browser, open the Developer Tools and locate the Console
tool. Paste the contents of the fc-master-filter.js into the Console,
then close the Developers Tools.

## Advanced

From the Console, you can temporarily ban bad actors. Here are some examples:

```
// Timeout "user1" for 10 minutes...
timeoutUser("user1", 10);`

// Timeout "user2" for an hour
timeoutUser("user2", 60);

// Timeout "user3" for a day
timeoutUser("user3", 60 * 24);
```

If you manually ban someone, but don't want to remember to unban them, there is
a feature for that, too. Here are some examples:

```
// Remove user1's ban in 10 minutes
autoClearBan("user1", 10);

// Remove user2's ban in an hour
autoClearBan("user2", 60);

// Remove user3's ban in 24 hours (a day)
autoClearBan("user3", 60 * 24);
```


