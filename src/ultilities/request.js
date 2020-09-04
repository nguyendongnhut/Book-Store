const RequestApi = async (url, options = {}) => {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const queryOptions = Object.assign({}, defaultOptions, options);
  const result = new Promise(async (resole, reject) => {
    try {
      const response = await fetch(url, queryOptions || {});
      if (response.ok) {
        const data = await response.json();
        resole(data);
      } else {
        reject({
          statusCode: response.status,
          message: response.statusText,
        });
      }
    } catch (e) {
      reject(e);
    }
  });

  return result;
};

export default RequestApi;
