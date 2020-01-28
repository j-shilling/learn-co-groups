# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    id { Random.rand(1...100_000) }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    token { Faker::Crypto.md5 }
    admin { false }

    trait :admin do
      admin { true }
    end
  end
end
