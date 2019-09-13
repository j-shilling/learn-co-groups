# frozen_string_literal: true

# Handles the OAuth2 callback route for logins with learn-co accounts
class SessionsController < ApplicationController
  # This action gets hit by learn-co after receiving our login request
  def create
    session[:current_user] = request.env['omniauth.auth']['info']
    redirect_to root_path
  end
end
