# frozen_string_literal: true

# Holds helper methods shared between multiple controllers
class ApplicationController < ActionController::Base
  helper_method :current_user

  private

  def current_user
    session[:current_user]
  end
end
