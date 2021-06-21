Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users

  resource :admin, only: [:create]
  post "/login", to: "admins#login"
  get "/auto_login", to: "admins#auto_login"

  resources :questions do
    collection do
      get :question_list, to: "questions#question_list"
      post :get_question_info, to: "questions#get_question_info"
    end
    member do

    end
  end
end
