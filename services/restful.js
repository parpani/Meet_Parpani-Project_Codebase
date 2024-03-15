import axios from "axios";

const requestOptions = {
  headers: { 'Content-Type': 'application/json' },
  
};

class RestfulService {

  constructor(props){
    this.urlVar = ' https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8';
  }

  fetchData(){
    console.log(this.urlVar)
    return axios.post(this.urlVar)
  }

}

export default new RestfulService();