# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 20171021190920) do

  create_table "elements", force: :cascade do |t|
    t.string "name"
    t.string "xSize"
    t.string "ySize"
    t.string "xStart"
    t.string "yStart"
    t.string "isConstant"
    t.string "xVelocity"
    t.string "yVelocity"
    t.string "x"
    t.string "y"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "results", force: :cascade do |t|
    t.string "leftSide"
    t.string "relation"
    t.string "rightSide"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "taskname"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "value_id"
    t.integer "element_id"
    t.integer "result_id"
    t.index ["element_id"], name: "index_tasks_on_element_id"
    t.index ["result_id"], name: "index_tasks_on_result_id"
    t.index ["value_id"], name: "index_tasks_on_value_id"
  end

  create_table "values", force: :cascade do |t|
    t.string "name"
    t.string "known"
    t.string "place"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
