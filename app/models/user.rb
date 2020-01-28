# frozen_string_literal: true

class User < ApplicationRecord
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

  def learn_co_attributes=(args)
    args.each do |k, v|
      unless k.to_sym == :id
        send("#{k}=", v) if respond_to? "#{k}="
      end
    end
  end

  def self.from_omniauth_params(args)
    user = User.find_by_id(args[:id])

    unless user
      user = User.new
      user.id = args[:id]
    end

    user.learn_co_attributes = args
    user.save
    user
  end
end