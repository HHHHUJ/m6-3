let urlObj = {};
if(process.env.NODE_ENV === "development") {
  urlObj = {
    apiUrl: 'http://localhost:3000/',
    comUrl: 'http://localhost:3000/'
  }
} else {
  urlObj = {
    apiUrl: 'http://localhost:3000/',
    comUrl: 'http://localhost:3000/'
  }
}
export default urlObj;