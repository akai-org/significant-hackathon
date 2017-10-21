Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FB_ID'], ENV['FB_SECRET']
end
