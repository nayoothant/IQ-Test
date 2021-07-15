class User < ApplicationRecord
    validates :email, :phone, uniqueness: true
    validates :email, confirmation: true
end
