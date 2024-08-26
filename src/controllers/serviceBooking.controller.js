const bookingService = require("../services/serviceBookings.service");
const Staff = require("../models/staffs.model");
const Services = require("../models/services.model");
const Customers = require("../models/customers.model");
const ERROR_CODE = require("../constants/errorCode");

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "ASC",
      customer_code,
      service_name,
      staff_code,
      status,
      fromDate,
      toDate,
    } = req.query;
    // Kiểm tra giá trị sortBy và order hợp lệ
    const validSortBy = ["createdAt", "updatedAt"];
    const validOrder = ["ASC", "DESC"];

    if (!validSortBy.includes(sortBy)) sortBy = "createdAt";
    if (!validOrder.includes(order.toUpperCase())) order = "ASC";

    // Tạo đối tượng filter từ các tham số lọc
    const filters = {};
    if (customer_code) filters.customer_code = customer_code;
    if (service_name) filters.service_name = service_name;
    if (staff_code) filters.staff_code = staff_code;
    if (status) filters.status = status;
    if (fromDate || toDate) {
      filters.booking_date = {};
      if (fromDate) filters.booking_date[Op.gte] = new Date(fromDate);
      if (toDate) filters.booking_date[Op.lte] = new Date(toDate);
    }
    const result = await bookingService.getAllBookings({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
      filters,
    });

    return res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.bookings,
      totalPages: result.totalPages,
      totalBookings: result.totalBookings,
      page: result.page,
      limit: result.limit,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const {
      customer_code,
      service_name,
      staff_code,
      booking_date,
      status,
      notes,
    } = req.body;

    // Tìm kiếm khách hàng, nhân viên và dịch vụ từ mã tương ứng
    const customer = await Customers.findOne({ where: { customer_code } });
    if (!customer) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.CUSTOMER_NOT_FOUND.code,
        message: ERROR_CODE.CUSTOMER_NOT_FOUND.msg,
      });
    }

    const staff = await Staff.findOne({ where: { staff_code } });
    if (!staff) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.STAFF_NOT_FOUND.code,
        message: ERROR_CODE.STAFF_NOT_FOUND.msg,
      });
    }

    const service = await Services.findOne({ where: { service_name } });
    if (!service) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.SERVICE_NOT_FOUND.code,
        message: ERROR_CODE.SERVICE_NOT_FOUND.msg,
      });
    }

    // Tạo mới booking
    const result = await bookingService.createNewBooking({
      customer_id: customer.id,
      service_id: service.id,
      staff_id: staff.id,
      booking_date,
      status,
      notes,
    });

    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }

    return res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.booking,
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const {
      customer_code,
      service_name,
      staff_code,
      booking_date,
      status,
      notes,
    } = req.body;

    // Tìm kiếm khách hàng, nhân viên và dịch vụ từ mã tương ứng
    const customer = await Customers.findOne({ where: { customer_code } });
    if (!customer) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.CUSTOMER_NOT_FOUND.code,
        message: ERROR_CODE.CUSTOMER_NOT_FOUND.msg,
      });
    }

    const staff = await Staff.findOne({ where: { staff_code } });
    if (!staff) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.STAFF_NOT_FOUND.code,
        message: ERROR_CODE.STAFF_NOT_FOUND.msg,
      });
    }

    const service = await Services.findOne({ where: { service_name } });
    if (!service) {
      return res.status(400).json({
        status: "failed",
        code: ERROR_CODE.SERVICE_NOT_FOUND.code,
        message: ERROR_CODE.SERVICE_NOT_FOUND.msg,
      });
    }
    // Cập nhật booking
    const result = await bookingService.updateBooking(id, {
      customer_id: customer.id,
      service_id: service.id,
      staff_id: staff.id,
      booking_date,
      status,
      notes,
    });

    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }

    return res.status(result.code).json({
      status: result.status,
      code: result.code,
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

    // Xóa booking
    const result = await bookingService.deleteBooking(id);

    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }

    return res.status(result.code).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  get,
  update,
  remove,
};
