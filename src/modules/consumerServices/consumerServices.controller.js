import ApiResponse from "../../utils/apiResponse.js";
import { consumerServicesModel } from "./consumerServices.model.js";

export const getAllServices = async (req, res) => {
    try {
        const result = await consumerServicesModel.getAllServices();

        return ApiResponse.success(res, "Services fetched successfully.", result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getServiceType = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const result = await consumerServicesModel.getServiceType(serviceId);
        return ApiResponse.success(res, "Service type fetched successfully.", result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCommonIssues = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const result = await consumerServicesModel.getCommonIssues(serviceId);
        return ApiResponse.success(res, "Common issues fetched successfully.", result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
    