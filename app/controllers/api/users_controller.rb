# frozen_string_literal: true

class Api::UsersController < ApplicationController
  include Authenticator

  before_action :check_logged_in

  def index
    users = api.get("/batches/#{batch_id}/users",
                    page: index_params[:page],
                    per: index_params[:per])
    render json: users
  end

  private

  def index_params
    params.permit(:page, :per)
  end

  def batch_id
    params.require(:batch_id)
  end

  def api
    LearnApi.new learn_co_token
  end

  def check_logged_in
    unless logged_in?
      render(status: :unauthorized, json: { errors: ['You are not logged in'] })
    end
  end
end
