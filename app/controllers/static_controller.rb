# frozen_string_literal: true

class StaticController < ApplicationController
  def index
    if current_user
      render :index
    else
      redirect_to login_path
    end
  end

  def login
    if current_user
      redirect_to root_path
    else
      render :login
    end
  end
end
