# frozen_string_literal: true

Rails.application.routes.draw do
  root 'groups#home'
  get '/auth/:provider/callback', to: 'sessions#create'
end
