# frozen_string_literal: true

module Api
  class UsersController < ApiController
    def index
      users = api.get("/batches/#{batch_id}/users",
                      page: page,
                      per: per)
      render json: users
    end

    private

    def batch_id
      params.require(:batch_id)
    end
  end
end
