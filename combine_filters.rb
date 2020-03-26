#!/usr/bin/env ruby

`rm fc-master-filter.js` if File.exists? 'fc-master-filter.js'
files = Dir['*.js'].sort
MASTER_SHIELD = 'fc-master-filter.js'
content = files.map { |f| `cat #{f}` }.join "\n"
File.write MASTER_SHIELD, content

