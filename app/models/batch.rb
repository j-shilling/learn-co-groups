# frozen_string_literal: true

class Batch < ApplicationRecord
  attribute :iteration, :string

  def to_s
    iteration
  end
end
