# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include Authenticator

    before_action :check_logged_in

    def check_logged_in
      unless logged_in?
        render(status: :unauthorized, json: { errors: ['You are not logged in'] })
      end
    end

    def page
      params.permit(:page)[:page]
    end

    def per
      params.permit(:per)[:per]
    end

    def api
      LearnApi.new learn_co_token
    end
  end
end
