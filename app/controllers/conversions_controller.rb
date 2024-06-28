class ConversionsController < ApplicationController
  def create
  	original_currency = params[:original_currency].split(",").first
  	target_currency = params[:target_currency].split(",").first

    service = CurrencyConversionService.new(original_currency, target_currency, params[:amount].to_f)
    result = service.call

    if result[:error]
      render json: { error: result[:error] }, status: :bad_request
    else
      conversion = Conversion.create(result)
      render json: conversion, status: :created
    end
  end
end
