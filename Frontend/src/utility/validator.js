export function validator (email,password){

     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     const emailRegix =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

     if (!email || !password) {
     return {message: "Please fill all fields"}
      
    }

    if (!emailRegix.test(email)) {
     return { message:"Invalid email format"}
      
    }

    if (!passwordRegex.test(password)) {
       return { message:"Password must be 8 characters"}
    }

    return null
}