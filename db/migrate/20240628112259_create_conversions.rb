class CreateConversions < ActiveRecord::Migration[7.0]
  def change
    create_table :conversions do |t|
      t.string :original_currency
      t.string :target_currency
      t.decimal :original_amount
      t.decimal :converted_amount
      t.decimal :exchange_rate

      t.timestamps
    end
  end
end
