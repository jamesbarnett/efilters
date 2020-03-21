task default: [:clean, :build, :jshint]

task :build do
  puts `ruby combine_filters.rb`
end

task :jshint do
  puts `jshint fc-master-filter.js`
end

task :clean do
  puts `rm fc-master-filter.js`
end

