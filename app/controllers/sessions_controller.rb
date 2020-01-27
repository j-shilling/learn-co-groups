# frozen_string_literal: true

# Handles the OAuth2 callback route for logins with learn-co accounts
class SessionsController < ApplicationController
  # This action gets hit by learn-co after receiving our login request
  def create
    user = User.from_omniauth_params(user_params)
    session[:current_user] = user
    redirect_to root_path
  end

  def current_user
    render json: session[:current_user]
  end

  private

  def user_params
    request.env['omniauth.auth']['info']
  end
end
