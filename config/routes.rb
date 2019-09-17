# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  get '/auth/:provider/callback', to: 'sessions#create'
end
