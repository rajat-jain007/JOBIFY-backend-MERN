// if we want to fetch jobs we need to go through this middleware and this is where we will check for the cookie and JWT token if the user is authenticated/registered or not. fetch jobs is protected with this layer.
export const authenticateUser = async (req, res, next) => {
  console.log("auth middleware");
  next(); 
};
