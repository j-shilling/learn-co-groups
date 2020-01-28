# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validation' do
    it { should_not validate_presence_of(:admin) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:token) }
  end

  describe 'association' do
    it { should have_many(:batches).through(:batch_users) }
  end

  describe '.from_omniauth_params' do
    let(:learn_co_user) { attributes_for(:user) }

    describe 'return value' do
      subject { User.from_omniauth_params(learn_co_user) }

      it { is_expected.to be_a User }
      it { is_expected.to have_attributes(learn_co_user) }
    end

    describe 'side effects' do
      it 'creates a new DB entry when given a new id' do
        expect do
          User.from_omniauth_params(learn_co_user)
        end.to change { User.count }.from(0).to(1)
      end

      it 'does not create change the DB when given an existing id' do
        User.from_omniauth_params(learn_co_user)
        expect do
          User.from_omniauth_params(learn_co_user)
        end.not_to change { User.count }
      end
    end
  end
end
