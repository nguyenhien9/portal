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
    return res.status(200).json({
      status: "success",
      message: "Staffs fetched successfully",
      data: result.data,
      totalPages: result.totalPages,
      totalStaffs: result.totalStaffs,
      page: result.page,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { staff_code, full_name, phone_number } = req.body;
    const result = await staffService.createStaff({
      staff_code,
      full_name,
      phone_number,
    });
    if (result.status === "failed") {
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }
    res.status(201).json({
      status: "success",
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const { staff_code, full_name, phone_number } = req.body;

    const result = await staffService.updateStaff(id, {
      staff_code,
      full_name,
      phone_number,
    });

    if (result.status === "failed") {
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }

    return res.status(200).json({
      status: "success",
      message: result.message,
      data: result.data,
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
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }

    return res.status(200).json({
      status: "success",
      message: result.message,
    });
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
