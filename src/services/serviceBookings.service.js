const { Op } = require("sequelize");
const ERROR_CODE = require("../constants/errorCode");
const ServiceBooking = require("../models/serviceBooking.model");
const generateRandomCode = require("../utils/helpers");
const getAllBookings = async ({ page, limit, sortBy, order, filters }) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};
    if (filters) {
      if (filters.customer_code) {
        where.customer_code = filters.customer_code;
      }
      if (filters.service_name) {
        where.service_name = filters.service_name;
      }
      if (filters.staff_code) {
        where.staff_code = filters.staff_code;
      }
      if (filters.status) {
        where.status = filters.status;
      }
      if (filters.booking_date) {
        if (filters.booking_date[Op.between]) {
          where.booking_date = {
            [Op.between]: filters.booking_date[Op.between],
          };
        } else if (filters.booking_date[Op.gte]) {
          where.booking_date = {
            [Op.gte]: filters.booking_date[Op.gte],
          };
        } else if (filters.booking_date[Op.lte]) {
          where.booking_date = {
            [Op.lte]: filters.booking_date[Op.lte],
          };
        }
      }
    }

    const { rows, count } = await ServiceBooking.findAndCountAll({
      where,
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      code: 200,
      message: "Bookings fetched successfully",
      bookings: rows,
      totalPages,
      totalBookings: count,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const createNewBooking = async (dto) => {
  try {
    let uniqueCode;
    let existingBooking;
    do {
      uniqueCode = generateRandomCode("BO");
      existingBooking = await ServiceBooking.findOne({
        where: { booking_code: uniqueCode },
      });
    } while (existingBooking);
    dto.booking_code = uniqueCode;

    const newBooking = await ServiceBooking.create({ ...dto });
    return {
      status: "success",
      code: 201,
      message: "Create booking successfully.",
      booking: newBooking,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const updateBooking = async (id, dto) => {
  try {
    const booking = await ServiceBooking.findByPk(id);
    if (!booking) {
      return {
        status: "failed",
        code: ERROR_CODE.BOOKING_NOT_FOUND.code,
        message: ERROR_CODE.BOOKING_NOT_FOUND.msg,
      };
    }

    // Cập nhật thông tin booking
    await booking.update({ ...dto });

    return {
      status: "success",
      code: 200,
      message: "Booking updated successfully.",
      booking,
    };
  } catch (error) {
    console.error("Error updating booking:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const deleteBooking = async (id) => {
  try {
    const booking = await ServiceBooking.findByPk(id);
    if (!booking) {
      return {
        status: "failed",
        code: ERROR_CODE.BOOKING_NOT_FOUND.code,
        message: ERROR_CODE.BOOKING_NOT_FOUND.msg,
      };
    }

    // Xóa booking
    await booking.destroy();

    return {
      code: 204,
    };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

module.exports = {
  getAllBookings,
  createNewBooking,
  updateBooking,
  deleteBooking,
};
