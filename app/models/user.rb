# frozen_string_literal: true

class User < ApplicationRecord
  include LearnCoModel

  attribute :admin, :boolean, default: false
  attribute :first_name, :string
  attribute :last_name, :string
  attribute :token, :string

  validates :first_name, :last_name, :token, presence: true

  has_many :batch_users
  has_many :batches, through: :batch_users

  def to_s
    "#{first_name} #{last_name}"
  end
end
