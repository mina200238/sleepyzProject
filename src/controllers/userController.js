const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");



const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("모든 정보가 필요합니다!");
  }


  try {
    const isRegister = await User.find({ email: email });
    if (isRegister.length !== 0) {
      res.status(409);
      throw new Error('이미 가입된 이메일 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      address: [],
      phone_number: [],
      is_admin: 0,
    };


    const user = await User.create(newUser);
    console.log(user);

    res.status(200).json({ data: null, message: '회원 가입 성공' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  // TODO: 토큰 구현 후 진행
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('잘못된 요청입니다.');
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "50m" }
      );
      res.status(200).json({ accessToken });
    }
  } catch (error) {
    next(error);
  }



};

const signOut = async (req, res, next) => {
  // TODO: 로그인 구현 후 진행
  try {

    //const user = await User.findOne({ email });
    // if (!user) {
    // res.status(404);
    //throw new Error("Contact not found");
    //}
    console.log(req.body);
    const decoded = jwt.verify(req.body.accessToken, process.env.ACCESS_TOKEN_SECERT);
    console.log(decoded.user.id);
    const id = decoded.user.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ decoded });
  } catch (err) {
    next(err);
  }
}
module.exports = { signUp, signOut, login };
