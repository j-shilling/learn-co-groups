# frozen_string_literal: true

module Authenticator
  extend ActiveSupport::Concern

  def current_user
    session[:current_user]
  end

  def learn_co_token
    current_user['token']
  end

  def logged_in?
    !!session[:current_user]
  end
end
