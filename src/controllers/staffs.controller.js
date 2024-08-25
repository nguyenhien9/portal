const staffService = require("../services/staffs.service");

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "ASC",
    } = req.query;
    const result = await staffService.getAllStaffs({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
    });
    return res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.staffs,
      totalPages: result.totalPages,
      totalStaffs: result.count,
      page: result.page,
      limit: result.limit,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { staff_code, full_name, phone_number, position } = req.body;
    const result = await staffService.createStaff({
      staff_code,
      full_name,
      phone_number,
      position,
    });
    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }
    res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.staff,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const { staff_code, full_name, phone_number, position } = req.body;

    const result = await staffService.updateStaff(id, {
      staff_code,
      full_name,
      phone_number,
      position,
    });

    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }

    return res.status(result.code).json({
      status: "success",
      code: result.code,
      message: result.message,
      data: result.staff,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params; // Lấy id từ URL params

    const result = await staffService.deleteStaff(id);

    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }

    return res.status(result.code).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
