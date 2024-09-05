import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(400).json({ message: "your is not login" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.userId
    req.role = decoded.role
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }
    next();
  } catch (err) {
    next()
  }
};

export const adminCheckRole = (req, res, next) => {
    if (req.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "only admin can do this task" });
    }
};
