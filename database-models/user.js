// models/user.js
const userSchema = {
    user_id: Number,
    user_name: String,
    password: String,
    email: String,
    phone: String,
    city: String,
    place_list_id: Number
  };
  
export default userSchema;  
