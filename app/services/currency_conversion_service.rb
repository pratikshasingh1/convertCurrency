require 'httparty'

class CurrencyConversionService
  include HTTParty
  base_uri 'https://v6.exchangerate-api.com/v6'

  def initialize(original_currency, target_currency, amount)
    @original_currency = original_currency
    @target_currency = target_currency
    @amount = amount
    @api_key = ENV['EXCHANGE_RATE_API_KEY']
  end

  def call
    response = self.class.get("/#{@api_key}/latest/#{@original_currency}")
    if response.success? && response['conversion_rates'] && response['conversion_rates'][@target_currency]
      rate = response['conversion_rates'][@target_currency]
      converted_amount = @amount * rate
      { original_currency: @original_currency, target_currency: @target_currency, original_amount: @amount, converted_amount: converted_amount, exchange_rate: rate }
    else
      { error: 'Unable to retrieve exchange rates' }
    end
  end
end
