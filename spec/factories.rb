# frozen_string_literal: true

def random_iteration
  program = %w[ds web].sample
  pace = %w[pt ft].sample
  year = Random.rand(2010...DateTime.now.year)
  month = Random.rand(1...12).to_s.rjust(2, "0")
  day = Random.rand(1...31).to_s.rjust(2, "0")

  "online-#{program}-#{pace}-#{year}#{month}#{day}"
end

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

  factory :batch do
    id { Random.rand(1...100_000) }
    iteration { random_iteration }
  end

  factory :batch_user do
    user
    batch
  end
end
