# frozen_string_literal: true

module Api
  class BatchesController < ApplicationController
    include Authenticator

    def index
      if logged_in?
        api = LearnApi.new current_user['token']
        batches = api.get('/batches',
                          page: index_params[:page],
                          per: index_params[:per])
        render json: batches
      else
        render status: :unauthorized, json: { errors: ['You are not logged in'] }
      end
    end

    private

    def index_params
      params.permit(:page, :per)
    end
  end
end
