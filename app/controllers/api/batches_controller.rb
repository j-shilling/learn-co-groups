# frozen_string_literal: true

module Api
  class BatchesController < ApplicationController
    include Authenticator

    def index
      if logged_in?
        api = LearnApi.new current_user['token']
        batches = api.get('/batches')
        render json: batches
      else
        render status: :unauthorized, json: { errors: ['You are not logged in'] }
      end
    end
  end
end
