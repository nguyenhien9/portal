const serviceService = require("../services/services.service");

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 5,
      sortBy = "createdAt",
      order = "ASC",
    } = req.query;
    const result = await serviceService.getAllServices({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
    });
    return res.status(200).json({
      status: "success",
      message: "Services fetched successfully",
      results: result.services,
      totalPages: result.totalPages,
      totalServices: result.totalServices,
      limit: result.limit,
      page: result.page,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { service_code, service_name } = req.body;
    const result = await serviceService.createService({
      service_code,
      service_name,
    });
    if (result.status === "failed") {
      return res.status(400).json({
        status: result.status,
        code: result.code,
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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { service_code, service_name } = req.body;

    const result = await serviceService.updateService(id, {
      service_code,
      service_name,
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
    const { id } = req.params;

    const result = await serviceService.deleteService(id);

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
