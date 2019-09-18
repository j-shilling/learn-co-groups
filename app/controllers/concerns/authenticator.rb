module Authenticator
  extend ActiveSupport::Concern

  def current_user
    session[:current_user]
  end

  def logged_in?
    !!session[:current_user]
  end
end
