#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require "json"
require "pathname"

# Compile documentation markdown into a raw JSON artifact.
#
# Input:
#   - content_catalog.json (array of objects with file_key/class_name)
#
# Output:
#   - raw_content.json (array of objects with file_key/class_name/raw_content)
ROOT = Pathname.new(__dir__).parent
catalog_path = ROOT.join("content_catalog.json")
output_path = ROOT.join("raw_content.json")

raise "Missing catalog file: #{catalog_path}" unless catalog_path.exist?

catalog = JSON.parse(catalog_path.read, symbolize_names: false)
compiled = catalog.map do |entry|
  file_key = entry.fetch("file_key")
  class_name = entry.fetch("class_name")
  source_path = ROOT.join(file_key)

  raise "Catalog entry points to missing file: #{file_key}" unless source_path.exist?

  raw_content = source_path
    .binread
    .force_encoding("UTF-8")
    .encode("UTF-8", invalid: :replace, undef: :replace, replace: "")

  {
    "file_key" => file_key,
    "class_name" => class_name,
    "raw_content" => raw_content
  }
end

json_output = JSON.pretty_generate(compiled, ascii_only: true)
output_path.write("#{json_output}\n")

puts "Wrote #{compiled.length} entries to #{output_path}"
