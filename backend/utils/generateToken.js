import jwt from "jsonwebtoken";

const NUMBER_OF_SECONDS_IN_A_DAY = 86_400;
const THIRTY_DAYS_IN_SECONDS = 30 * NUMBER_OF_SECONDS_IN_A_DAY;

const generateToken = (res, userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: THIRTY_DAYS_IN_SECONDS,
  });
};

export default generateToken;
