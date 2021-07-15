Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users

  resource :admins do
    collection do
      post :login, to: "admins#login"
    end
  end
  # get "/auto_login", to: "admins#auto_login"

  resources :questions do
    collection do
      get :question_list, to: "questions#question_list"
      get :get_question_info, to: "questions#get_question_info" 
      get :get_question_type, to: "questions#get_question_type"
      post :create_question, to: "questions#create_question"
      post :update_question, to: "questions#update_question"
      post :delete_question, to: "questions#delete_question"
      post :update_question_group, to: "questions#update_question_group"
      post :delete_group, to: "questions#delete_group"
      get :get_questions, to: "questions#get_questions"
    end
  end

  resources :answers do
    collection do
      post :store_answers, to: "answers#store_answers"
    end
  end
end
