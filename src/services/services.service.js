const Services = require("../models/services.model");
const ERROR_CODE = require("../constants/errorCode");

const getAllServices = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Services.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      code: 200,
      message: "Services fetched successfully",
      services: rows,
      totalPages,
      totalServices: count,
      limit,
      page,
    };
  } catch (error) {
    console.error("Error fetching all services:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};
const createService = async (dto) => {
  try {
    const existingService = await Services.findOne({
      where: { service_code: dto.service_code },
    });
    if (existingService) {
      return {
        status: "failed",
        code: ERROR_CODE.SERVICE_EXISTING.code,
        message: ERROR_CODE.SERVICE_EXISTING.msg,
      };
    }
    const newService = await Services.create({ ...dto });
    return {
      status: "success",
      code: 201,
      message: "Create service successfully.",
      data: newService,
    };
  } catch (error) {
    console.error("Error creating service:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};
const updateService = async (id, dto) => {
  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return {
        status: "failed",
        code: ERROR_CODE.SERVICE_NOT_FOUND.code,
        message: ERROR_CODE.SERVICE_NOT_FOUND.msg,
      };
    }

    // Cập nhật thông tin dịch vụ
    await service.update({ ...dto });

    return {
      status: "success",
      code: 200,
      message: "Service updated successfully.",
      service,
    };
  } catch (error) {
    console.error("Error updating service:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const deleteService = async (id) => {
  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return {
        status: "failed",
        code: ERROR_CODE.SERVICE_NOT_FOUND.code,
        message: ERROR_CODE.SERVICE_NOT_FOUND.msg,
      };
    }

    // Xóa dịch vụ
    await service.destroy();

    return {
      code: 204,
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
