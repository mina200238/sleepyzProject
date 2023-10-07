const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  async checkRegistration(email) {
    const isRegistered = await User.find({ email: email });
    return isRegistered;
  }

  async signUp(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      address: [],
      phone_number: [],
      admin_role: 0,
    };
    const user = await User.create(newUser);
    return user;
  }

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

  async signOut(user_id) {
    // 주문 조회
    const findData = await Order.find({
      user_id: user_id,
    });
    return findData;
  }
}

module.exports = UserService;
