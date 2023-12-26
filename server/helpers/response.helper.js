
const responseHelper = {};

responseHelper.sendResponse = (response, code, message, data) => {
    return response.status(code).send({
        isSuccess: code >= 200 && code <= 299 ? true : false,
        code: code,
        message: message || null,
        data: data || {}
    });
}


export default responseHelper;