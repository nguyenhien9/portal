const Position = require("../constants/enum/position.enum");
const ERROR_CODE = require("../constants/errorCode");
const Staff = require("../models/staffs.model");
const moment = require("moment");
const getAllStaffs = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Staff.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });

    const formattedStaffs = rows.map((staff) => {
      return {
        id: staff.id,
        staff_code: staff.staff_code,
        full_name: staff.full_name,
        position: staff.position,
        phone_number: staff.phone_number,
        created_at: moment(staff.createdAt).format("yyyy-MM-D"),
        updated_at: moment(staff.updated_at).format("yyyy-MM-D"),
      };
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      code: 200,
      message: "Staffs fetched successfully",
      staffs: formattedStaffs,
      totalPages,
      totalStaffs: count,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching all staffs:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const createStaff = async (dto) => {
  try {
    const existingStaff = await Staff.findOne({
      where: { staff_code: dto.staff_code },
    });
    if (existingStaff) {
      return {
        status: "failed",
        code: ERROR_CODE.STAFF_EXISTING.code,
        message: ERROR_CODE.STAFF_EXISTING.msg,
      };
    }
    if (!Object.values(Position).includes(dto.position)) {
      return {
        status: "failed",
        code: ERROR_CODE.STAFF_POSITION_INVALID.code,
        message: ERROR_CODE.STAFF_POSITION_INVALID.msg,
      };
    }
    const newStaff = await Staff.create({ ...dto });
    return {
      status: "success",
      code: 201,
      message: "Create staff successfully.",
      staff: newStaff,
    };
  } catch (error) {
    console.error("Error creating staff:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const updateStaff = async (id, dto) => {
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return {
        status: "failed",
        code: ERROR_CODE.STAFF_NOT_FOUND.code,
        message: ERROR_CODE.STAFF_NOT_FOUND.msg,
      };
    }

    // Cập nhật thông tin nhân viên
    await staff.update({ ...dto });

    return {
      status: "success",
      code: 200,
      message: "Staff updated successfully.",
      staff,
    };
  } catch (error) {
    console.error("Error updating staff:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const deleteStaff = async (id) => {
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return {
        status: "failed",
        code: ERROR_CODE.STAFF_NOT_FOUND.code,
        message: ERROR_CODE.STAFF_NOT_FOUND.msg,
      };
    }

    // Xóa nhân viên
    await staff.destroy();

    return {
      code: 204,
    };
  } catch (error) {
    console.error("Error deleting staff:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

module.exports = {
  createStaff,
  getAllStaffs,
  updateStaff,
  deleteStaff,
};
