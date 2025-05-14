// this is currently the test model for this specific API port, will be developed and clean further in the future with integration of Springboot backend
import axios from "axios";

//TODO this is a test functions using a test endpoint wiht mock data for UI purposes
const getNotebookTests = () => {
    try{
        return axios.get("http://localhost:8080/testNotebook")
        .then((response) => {
            return response.data
        })
    }
    catch(error){
        console.error('Notebook GET API error' + error);
    }
}

export default getNotebookTests

