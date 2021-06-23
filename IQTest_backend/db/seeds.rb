# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Admin.create!(username: "admin", password: "scmadmin")

Question.create!(question_group: 'test_group', question_type: 'test_type', question_text: 'what is your car?', choice_one: 'BMW', choice_two: 'Mercedez', choice_three: 'Maserati', right_answer: '3', questionNo: '2')
Question.create!(question_group: 'test_group_02', question_type: 'test_type_02', question_text: 'what is your name?', answer_choice: {"choice_one":"Hla Hla","choice_two":"Mya Mya","choice_three":"Mg Mg","choice_four":"Aung Aung","choice_five":"Ko Ko"}, right_answer: 'choice_five', questionNo: '1')