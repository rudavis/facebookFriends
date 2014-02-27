# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Load environment vars vars from local file
environment_vars = File.join(Rails.root, 'config', 'environment_vars.rb')
load(environment_vars) if File.exists?(environment_vars)

# Initialize the Rails application.
FacebookFriends::Application.initialize!
