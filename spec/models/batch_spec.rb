# frozen_string_literal: true

require 'rails_helper'
require './spec/models/concerns/learn_co_model_spec'

RSpec.describe Batch, type: :model do
  include_examples 'learn_co_model'

  describe 'validation' do
    it { should validate_presence_of(:iteration) }
  end

  describe 'association' do
    it { should have_many(:users).through(:batch_users) }
  end
end
