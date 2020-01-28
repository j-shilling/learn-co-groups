# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'learn_co_model' do
  describe '.from_omniauth_params' do
    let(:learn_co_model) do
      attributes_for(described_class.to_s.downcase.to_sym)
    end

    describe 'return value' do
      subject { described_class.from_learn_co(learn_co_model) }

      it { is_expected.to be_a described_class }
      it { is_expected.to have_attributes(learn_co_model) }
    end

    describe 'side effects' do
      it 'creates a new DB entry when given a new id' do
        expect do
          described_class.from_learn_co(learn_co_model)
        end.to change { described_class.count }.from(0).to(1)
      end

      it 'does not create change the DB when given an existing id' do
        described_class.from_learn_co(learn_co_model)
        expect do
          described_class.from_learn_co(learn_co_model)
        end.not_to change { described_class.count }
      end
    end
  end
end
