function ApiError(code, process, collection) {
  if (code === 400) {
    this.code = code;
    this.message = `Bad Request: ${process}`;
  }
  if (code === 500) {
    this.code = code;
    this.message = `MongoDB error: during ${process} into collection ${collection}`;
  }
  if (code === 404) {
    this.code = code;
    this.message = `Not found: during ${process} into collection ${collection}`;
  }
}

export { ApiError };
