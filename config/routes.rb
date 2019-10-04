# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  get '/login', to: 'static#login'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/current_user', to: 'sessions#current_user'

  namespace :api, defaults: { format: :json } do
    resources :batches, only: %i[index show] do
      resources :users, only: %i[index]
    end
  end

  # The front end is going to use react-router. Any routes not matched
  # to the authentication or API pages should go to React
  get '*unmatched_route', to: 'static#index'
end
