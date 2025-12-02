#!/usr/bin/env ruby
# frozen_string_literal: true

# Collect and resolve all markdown files into a single directory.
# Uploaded to Artifactory during build for services' consumption.

require 'json'
require 'fileutils'

SOURCE_DIR = File.expand_path('..', __dir__)
INCLUDES_DIR = File.join(SOURCE_DIR, '_includes')
OUTPUT_DIR = File.join(SOURCE_DIR, 'all_docs')
EXCLUDE_PATTERN = %r{/(_includes|_layouts|_site|all_docs|scripts|\.git)/}

def resolve_includes(content)
  content.gsub(/{%\s*include\s+(\S+)\s*%}/) do
    path = File.join(INCLUDES_DIR, $1)
    File.exist?(path) ? resolve_includes(File.read(path)) : "<!-- Include not found: #{$1} -->"
  end
end

FileUtils.rm_rf(OUTPUT_DIR)
FileUtils.mkdir_p(OUTPUT_DIR)

files = Dir.glob("#{SOURCE_DIR}/**/*.md").reject { |f| f =~ EXCLUDE_PATTERN }
index = files.map do |file|
  rel_path = file.sub("#{SOURCE_DIR}/", '')
  out_path = File.join(OUTPUT_DIR, rel_path)
  FileUtils.mkdir_p(File.dirname(out_path))
  File.write(out_path, resolve_includes(File.read(file)))
  { path: rel_path, url: "/documentation/all_docs/#{rel_path}" }
end

File.write(File.join(OUTPUT_DIR, 'index.json'), JSON.pretty_generate(files: index))
puts "Generated #{index.length} files in #{OUTPUT_DIR}"
