class NotFoundError extends Error {
    constructor(resourceType, id) {
        super(`${resourceType} of Id: ${id} was not found.`);
        this.name = "NotFoundError";
    }
}

export default NotFoundError;