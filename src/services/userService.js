const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  // 회원 등록 확인
  async checkRegistration(email) {
    const isRegistered = await User.find({ email: email });
    console.log(isRegistered);
    if (isRegistered.length !== 0 && isRegistered[0].deleted_at) {
      return undefined;
    }

    return isRegistered;
  }

  // 회원 등록
  async signUp(name, email, password, phone_number, address) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      address,
      phone_number,
      admin_role: 0,
    };
    const user = await User.create(newUser);
    return user;
  }

  // 로그인
  async login(email, password) {
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
        { expiresIn: '50m' },
      );
      return accessToken;
    } else return undefined;
  }

  // 회원 탈퇴
  async signOut(decoded) {
    const { id } = decoded.user;
    const deletedUser = await User.findOneAndUpdate(
      { _id: id },
      { deleted_at: new Date() },
    );
    return deletedUser;
  }

  // 회원 정보 수정
  async updateUserInfo(email, name, phone_number, address) {
    const updatedUserInfo = await User.updateMany(
      { email: email },
      { name, phone_number, address },
    );
    return updatedUserInfo;
  }
}

module.exports = UserService;
