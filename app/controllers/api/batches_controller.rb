# frozen_string_literal: true

module Api
  class BatchesController < ApiController
    def index
      batches = api.get('/batches',
                        page: page,
                        per: per)
      render json: batches
    end

    def show
      render json: api.get("/batches/#{batch_id}")
    end

    private

    def batch_id
      params.require(:id)
    end
  end
end
