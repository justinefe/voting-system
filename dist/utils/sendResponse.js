"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.sendSuccessResponse = exports.sendErrorResponse = void 0;

var sendErrorResponse = function sendErrorResponse(res, code, errorMessage) {
  return res.status(code).send({
    status: 'error',
    error: errorMessage
  });
};

exports.sendErrorResponse = sendErrorResponse;

var sendSuccessResponse = function sendSuccessResponse(res, code, data) {
  return res.status(code).send({
    status: 'success',
    data: data
  });
};

exports.sendSuccessResponse = sendSuccessResponse;

var successResponse = function successResponse(res, code, successMessage) {
  res.status(code).json({
    status: 'Success',
    message: successMessage
  });
};

exports.successResponse = successResponse;