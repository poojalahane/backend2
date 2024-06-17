import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const registerUser = asyncHandler(async (req, res) => {
  //1.- get user details from frontend
  //2.-validation- not empty
  //3.-check if user already exist: username, email
  //4.-check for images, check for avatar
  //5.- upload them to cloudinary, avtar
  //6.-create user object - create entry in db
  //7.-remove password and refresh token field from response
  //8.- check for user creation
  //9.-return res

  //1.- get user details from frontend
  const { fullName, email, username, password } = req.body;
  console.log("email :- ", email);
  console.log("password :- ", password);

  //2.-validation- not empty

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required.");
  }


//   if (fullName === "") {
//     throw new ApiError(400, "fullname is required");
//   }
// });

//3.-check if user already exist: username, email
const existedUser= await User.findOne({
  $or: [{ username }, { email }]
})
if(existedUser){
  throw new ApiError(409, "User with email or username already exists")
}

 //4.-check for images, check for avatar
 const avtarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.avatar[0]?.path;

 if(!avtarLocalPath){
  throw new ApiError(400, 'Avtar file is required' )
 }

 //5.- upload them to cloudinary, avtar
 const avtar = await uploadOnCloudinary(avtarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avtar){
  throw new ApiError(400, 'Avtar file is required' )
 }

//6.-create user object - create entry in db
const user= await User.create({
  fullName,
  avtar: avtar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
   username: username.toLowerCase()
})

  //7.-remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select("-password -refreshToken")


    //8.- check for user creation
    if(!createdUser){
      throw new ApiError(500, 'Something went wrong, while registring user.' )
    }

    //9.-return res
    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully.....")
    )

    

})


 
  



export { registerUser };
