# frozen_string_literal: true

module LearnCoModel
  extend ActiveSupport::Concern

  def learn_co_attributes=(args)
    args.each do |k, v|
      unless k.to_sym == :id
        send("#{k}=", v) if respond_to? "#{k}="
      end
    end
  end

  class_methods do
    def from_learn_co(args)
      model = find_by_id(args[:id])

      unless model
        model = new
        model.id = args[:id]
      end

      model.learn_co_attributes = args
      model.save
      model
    end
  end
end
