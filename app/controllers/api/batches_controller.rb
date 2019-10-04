# frozen_string_literal: true

module Api
  class BatchesController < ApplicationController
    include Authenticator

    before_action :check_logged_in

    def index
      batches = api.get('/batches',
                        page: index_params[:page],
                        per: index_params[:per])
      render json: batches
    end

    def show
      render json: api.get("/batches/#{batch_id}")
    end

    private

    def index_params
      params.permit(:page, :per)
    end

    def batch_id
      params.require(:id)
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
end
