const bookingService = require("../services/serviceBookings.service");
const Staff = require("../models/staffs.model");
const Services = require("../models/services.model");
const Customers = require("../models/customers.model");

const create = async (req, res, next) => {
  try {
    const {
      booking_code,
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
        message: "Customer not found with the provided customer_code",
      });
    }

    const staff = await Staff.findOne({ where: { staff_code } });
    if (!staff) {
      return res.status(400).json({
        status: "failed",
        message: "Staff not found with the provided staff_code",
      });
    }

    const service = await Services.findOne({ where: { service_name } });
    if (!service) {
      return res.status(400).json({
        status: "failed",
        message: "Service not found with the provided service_name",
      });
    }

    // Tạo mới booking
    const result = await bookingService.createNewBooking({
      booking_code,
      customer_id: customer.id,
      service_id: service.id,
      staff_id: staff.id,
      booking_date,
      status,
      notes,
    });

    if (result.status === "failed") {
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "ASC",
    } = req.query;
    const result = await bookingService.getAllBookings({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
    });

    return res.status(200).json({
      status: "success",
      message: "Bookings fetched successfully",
      data: result.data,
      totalPages: result.totalPages,
      totalBookings: result.totalBookings,
      page: result.page,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const {
      booking_code,
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
        message: "Customer not found with the provided customer_code",
      });
    }

    const staff = await Staff.findOne({ where: { staff_code } });
    if (!staff) {
      return res.status(400).json({
        status: "failed",
        message: "Staff not found with the provided staff_code",
      });
    }

    const service = await Services.findOne({ where: { service_name } });
    if (!service) {
      return res.status(400).json({
        status: "failed",
        message: "Service not found with the provided service_name",
      });
    }

    // Cập nhật booking
    const result = await bookingService.updateBooking(id, {
      booking_code,
      customer_id: customer.id,
      service_id: service.id,
      staff_id: staff.id,
      booking_date,
      status,
      notes,
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

    // Xóa booking
    const result = await bookingService.deleteBooking(id);

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
  create,
  get,
  update,
  remove,
};
