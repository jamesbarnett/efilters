#!/usr/bin/env ruby

files = Dir.glob '*.js'

MASTER_SHIELD = 'fc-master-filter.js'

content = files.map { |f| `cat #{f}` }.join "\n"

File.write MASTER_SHIELD, content
