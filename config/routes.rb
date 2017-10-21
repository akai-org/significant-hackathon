Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: 'json' } do
    scope :tasks do
      get '', to: 'tasks#index'
      get '/:id', to: 'tasks#show'
    end
  end


end
