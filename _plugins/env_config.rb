# frozen_string_literal: true

# env_config.rb
#
# Reads select environment variables at Jekyll bootstrap time and merges them
# into the site configuration, allowing build-time overrides without touching
# _config.yml.
#
# Supported variables
# -------------------
#   DEV_PORTAL_BASE_URL   – Base URL of the dev-portal API used for search.
#                           Defaults to the value in _config.yml
#                           (https://developers.procore.com).
#
# Usage (local development)
#   DEV_PORTAL_BASE_URL=http://localhost:3001 bundle exec jekyll serve --port 4005
#
# Usage (CI / GitHub Actions)
#   Add `DEV_PORTAL_BASE_URL: ${{ vars.DEV_PORTAL_BASE_URL }}` to the env block
#   of the build step and Jekyll will pick it up automatically.

Jekyll::Hooks.register :site, :after_init do |site|
  if (base_url = ENV['DEV_PORTAL_BASE_URL'].to_s.strip) && !base_url.empty?
    Jekyll.logger.info "env_config:", "DEV_PORTAL_BASE_URL=#{base_url}"
    site.config['dev_portal_base_url'] = base_url
  end
end
