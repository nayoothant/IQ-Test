Rails.application.routes.draw do

  resources :users

  resource :admin, only: [:create]
  post "/login", to: "admins#login"
  get "/auto_login", to: "admins#auto_login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end