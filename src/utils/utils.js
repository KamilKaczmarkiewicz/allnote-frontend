export function getStatusFromResponse(response) {
  return response.status ? response.status : response.response.status;
}

export function isStatusFromResponse2XX(response) {
  const status = getStatusFromResponse(response);
  return status >= 200 && status < 300;
}

export function getErrorFromResponse(response) {
  console.log(`kams do a test: ${response}`)
  return isStatusFromResponse2XX(response)
    ? false
    : getErrorDataFromResponse(response);
}

export function getErrorDataFromResponse(response) {
  console.log(response)
  return response.response.data;
}
