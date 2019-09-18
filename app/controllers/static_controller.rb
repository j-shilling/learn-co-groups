# frozen_string_literal: true

class StaticController < ApplicationController
  include Authenticator

  def index
    if !logged_in?
      redirect_to login_path
    end
  end

  def login
    if logged_in?
      redirect_to root_path
    else
      render :login
    end
  end
end
