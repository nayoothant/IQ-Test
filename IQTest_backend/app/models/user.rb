class User < ApplicationRecord
    validates :email, :phone, uniqueness: true
end
