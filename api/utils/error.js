export const errorHandler = (statsCode, message)=>{
    const error = new error();
    error.statsCode = statsCode;
    error.message = message;
    return error;

}