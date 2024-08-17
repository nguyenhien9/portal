const ServiceBooking = require("../models/serviceBooking.model");

const getAllBookings = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await ServiceBooking.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      message: "Bookings fetched successfully",
      data: rows,
      totalPages: totalPages,
      totalBookings: count,
      page: page,
    };
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

const createNewBooking = async (dto) => {
  try {
    const existingBooking = await ServiceBooking.findOne({
      where: { booking_code: dto.booking_code },
    });
    if (existingBooking) {
      return {
        status: "failed",
        message: "Booking already exists",
      };
    }
    const newBooking = await ServiceBooking.create({ ...dto });
    return {
      status: "success",
      message: "Create booking successfully.",
      data: newBooking,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

const updateBooking = async (id, dto) => {
  try {
    const booking = await ServiceBooking.findByPk(id);
    if (!booking) {
      return {
        status: "failed",
        message: "Booking not found",
      };
    }

    // Cập nhật thông tin booking
    await booking.update({ ...dto });

    return {
      status: "success",
      message: "Booking updated successfully.",
      data: booking,
    };
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

const deleteBooking = async (id) => {
  try {
    const booking = await ServiceBooking.findByPk(id);
    if (!booking) {
      return {
        status: "failed",
        message: "Booking not found",
      };
    }

    // Xóa booking
    await booking.destroy();

    return {
      status: "success",
      message: "Booking deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

module.exports = {
  getAllBookings,
  createNewBooking,
  updateBooking,
  deleteBooking,
};
