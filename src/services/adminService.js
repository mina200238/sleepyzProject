const { User, Category } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class AdminService {
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
    const deletedUser = await User.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
    return deletedUser;
  }

  // 회원 정보 수정
  async updateUserInfo(email, name, phone_number, address) {
    const updatedUserInfo = await User.updateMany({ email: email }, { name, phone_number, address });
    return updatedUserInfo;
  }

  // 🗂️: 카테고리 관련 코드
  // 카테고리 추가 시, 중복 확인
  async checkCategory(category_name) {
    const isExisted = await Category.find({ category_name: category_name });
    if (isExisted.length !== 0) {
      return undefined;
    }
    return isExisted;
  }

  // 카테고리 id가 유효한 지, 확인
  async checkCategoryId(category_id) {
    const isExsisted = await Category.findById({ _id: category_id });
    console.log(isExsisted);
    if (!isExsisted) {
      return undefined;
    }
    return isExsisted;
  }

  // 🤔: _id 서버 500 에러 발생하는 것 방지 -> 필요할까요?
  // id가 ObjectId 형식에 맞는 지, 확인
  async checkObjectId(object_id) {
    if (ObjectId.isValid(object_id)) return false;
    else true;
  }

  // 카테고리 조회
  async getCategories() {
    const categories = await Category.find({});
    return categories;
  }

  // 카테고리 추가
  async createCategory(category_name) {
    const countCategories = await Category.count();
    const newCategory = await Category.create({ category_number: countCategories + 1, category_name });
    return newCategory;
  }

  // 카테고리 수정
  async updateCategory(category_id, category_name) {
    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      {
        // category_name만 선택해서, 업데이트한다.
        // category_number는 그대로 유지
        category_name: category_name,
      },
      { new: true },
    );

    return updatedCategory;
  }

  // 카테고리 삭제
  async delteCategory(category_id) {
    const category = await Category.findById(category_id);
    await Category.deleteOne({ _id: category._id });
    return category;
  }
}

module.exports = AdminService;
