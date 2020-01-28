# frozen_string_literal: true

require 'rails_helper'
require './spec/models/concerns/learn_co_model_spec'

RSpec.describe User, type: :model do
  include_examples 'learn_co_model'

  describe 'validation' do
    it { should_not validate_presence_of(:admin) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:token) }
  end

  describe 'association' do
    it { should have_many(:batches).through(:batch_users) }
  end
end
