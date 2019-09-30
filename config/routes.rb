# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  get '/login', to: 'static#login'
  get '/auth/:provider/callback', to: 'sessions#create'

  # The front end is going to use react-router. Any routes not matched
  # to the authentication or API pages should go to React
  get '*unmatched_route', to: 'static#index'
end
