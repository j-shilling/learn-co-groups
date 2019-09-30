# frozen_string_literal: true

class LearnApi
  attr_reader :token

  # Save the base url for reuse-ability
  BASE_URL = 'https://learn.co/api'

  # Create a new instance with a learn.co api token for a logged in user
  def initialize(token)
    @token = token
  end

  # Perform a get request for at the specified endpoint with the given
  # parameters. Returns the reponse's body as a parsed hash, or nil if
  # an error occurred.
  def get(resource, params = {})
    url = BASE_URL + resource

    # Use lower level #read and #write here on the cache. If the GET
    # request fails we do not want that result saved in the cache.
    # Only save responses to successful requests.

    # Check if we have the result cached
    cached = Rails.cache.read([url, params])
    return cached if cached

    # Perform the request and watch for an exception
    begin
      r = RestClient.get(url,
                         Authorization: "Bearer #{token}",
                         Accept: 'version=1',
                         params: params)
    rescue RestClient::ExceptionWithResponse => e
      # Request resulted in an error
      Rails.logger.warning(e.response.to_s)
      return nil
    end

    # Request was succesful cache and return the result
    data = JSON.parse(r.body)
    Rails.cache.write([url, params], data)

    data
  end
end
