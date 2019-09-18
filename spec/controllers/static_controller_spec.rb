# frozen_string_literal: true

require 'rails_helper'

describe StaticController, type: :request do
  context 'when user is not logged in' do
    before do
      allow_any_instance_of(StaticController).to receive(:logged_in?).and_return(false)
    end
    describe 'GET /' do
      it 'should redirect to the login page' do
        get root_path
        expect(response).to redirect_to(login_path)
      end
    end
    describe 'GET /login' do
      it 'should render the login page' do
        get login_path
        expect(response).to render_template(:login)
      end
    end
  end

  context 'when user is logged in' do
    before do
      allow_any_instance_of(StaticController).to receive(:logged_in?).and_return(true)
    end

    describe 'GET /' do
      it 'should render the index page' do
        get root_path
        expect(response).to render_template(:index)
      end
    end
    describe 'GET /login' do
      it 'should redirect to the index page' do
        get login_path
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
