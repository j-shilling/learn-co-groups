# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BatchUser, type: :model do
  describe 'validation' do
    subject { build(:batch_user) }

    it { should validate_uniqueness_of(:batch_id).scoped_to(:user_id) }
  end

  describe 'association' do
    it { should belong_to(:user) }
    it { should belong_to(:batch) }
  end
end
