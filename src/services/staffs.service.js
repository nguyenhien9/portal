const Staff = require("../models/staffs.model");

const getAllStaffs = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Staff.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      message: "Staffs fetched successfully",
      data: rows,
      totalPages: totalPages,
      totalStaffs: count,
      page: page,
    };
  } catch (error) {
    console.error("Error fetching all staffs:", error);
    throw error;
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
        message: "Staff already exists",
      };
    }

    const newStaff = await Staff.create({ ...dto });
    return {
      status: "success",
      message: "Create staff successfully.",
      data: newStaff,
    };
  } catch (error) {
    console.error("Error creating staff:", error);
    throw error;
  }
};

const updateStaff = async (id, dto) => {
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return {
        status: "failed",
        message: "Staff not found",
      };
    }

    // Cập nhật thông tin nhân viên
    await staff.update({ ...dto });

    return {
      status: "success",
      message: "Staff updated successfully.",
      data: staff,
    };
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error;
  }
};

const deleteStaff = async (id) => {
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return {
        status: "failed",
        message: "Staff not found",
      };
    }

    // Xóa nhân viên
    await staff.destroy();

    return {
      status: "success",
      message: "Staff deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};

module.exports = {
  createStaff,
  getAllStaffs,
  updateStaff,
  deleteStaff,
};
