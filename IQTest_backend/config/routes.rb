Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :questions do
    collection do      
      get :question_list, to: "questions#question_list"
      get :get_question_info, to: "questions#get_question_info" 
      get :get_question_type, to: "questions#get_question_type"
      post :create_question, to: "questions#create_question"
      post :update_question, to: "questions#update_question"
      post :delete_question, to: "questions#delete_question"
    end
    member do
      
    end
  end
end
