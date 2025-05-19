// this is currently the test model for this specific API port, will be developed and clean further in the future with integration of Springboot backend
import axios from "axios";
import useUserNotebookStore from "../hooks/useUserNotebookStore";
import useUserNotebookAvailStore from "../hooks/userNotebookAvailStore";

const API_URL = "/api/notebooks" //TODO change to https when deployed
//all endpoints return 403 forbidden if JWT token is invalid/user isnt logged in
axios.defaults.withCredentials = true

//returns array of all metadata notebook objects for displaying
const getAllNotebooksAPI = async () => {
    
    let response;
    try{
        response = await axios.get(API_URL);
        if(response.status == 200){
            //sorted array everytime for renaming and deleting purposes
            response.data.sort((a, b) => {
                if (a.notebookId < b.notebookId) {
                    return -1;
                }
                if (a.notebookId > b.notebookId) {
                    return 1;
                }
                return 0;
            });
            //set global state to the notebooks
            useUserNotebookStore.getState().setNotebooks(response.data)
        }
    }catch(error){
        return {
            status: 403, //not logged in
            data: []
        }
    }

    //returns empty array if user has no notebooks and 403 forbidden if theyre not logged in
    return{
        data: response.data,
        status: response.status
    }
}

//returns data object of a specific notebook
const getDataNotebookAPI = async ({ id }) => {
    let response;
    try{
        response = await axios.get(API_URL + "/" + id);
    }catch(error){
        return null
    }

    //returns empty notebook where everything is null if the notebook doesnt exist. shouldnt happen if called from web app
    return{
        data: response.data,
        status: response.status
    }
}

//create notebook endpoint, takes in the name, topic, subtopic, difficulty these all are sent via numbers to prevent prompt injection on the backend
//returns a full notebook complete with all its data to be opened on the web app side
const createNotebookAPI = async ({ name, topic, subTopic, difficulty }) => {
    let response;
    try{
        response = await axios.post(API_URL, {
            name: name,
            topic: topic, //convert to 1 indexing for backend parsing
            subTopic: subTopic,
            difficulty: difficulty
        })
        console.log(response.data)
        if(response.data.topic == null){ //notebook will be an empty notebook if the User runs out of tokens, will be changed at some point for now this works
            return null
        }
    }catch(error){
        return null
    }

    //201 created if notebook was created successfully
    //TODO handle if answer pod success == false, and determine if the answer title is worth it or not may be a polishing step
    return {
        data: response.data,
        status: response.status
    }
}

//delete notebook endpoint, takes in the notebook id
//returns 204 if notebook was deleted successfully, and 404 if notebook isnt yours, (shouldnt happen is used via web app)
const deleteNotebookAPI = async ({ id }) => {
    let response;
    try{
        response = await axios.delete(API_URL + "/" + id);
    }catch(error){
        return {
            status: 404 //not found
        }
    }

    //returns 204 if notebook was deleted successfully
    return{
        status: response.status
    }
}

//update notebook name,
//returns 200 if notebook was updated successfully, and 404 if notebook isnt yours (shouldnt happen is used via web app) again*
const updateNotebookAPI = async ({ id, name }) => {
    let response;
    try{
        response = await axios.patch(API_URL + "/" + id, {
            name: name
        });
    }catch(error){
        return {
            status: 404 //not found
        }
    }

    //returns 200 if notebook was updated successfully
    return{
        status: response.status
    }
}

//get notebook availability, this is called intervally to stream the latest notebook count to the user.
//returns users count and global count
const getNotebookAvailabilityAPI = async () => {
    let response;
    try{
        
        response = await axios.get(API_URL + "/count");
        const setNotebookAvailState = useUserNotebookAvailStore.getState().setNotebooksAvail
        setNotebookAvailState({
            globalNotebooksAvail: response.data.globalAvailableNotebooks,
            userNotebooksAvail: response.data.userAvailableNotebooks
        })
        
    }catch(error){
        console.error('Get notebook availability API error:: ' + error)
    }

    //user count and global count and 200 OK. 403 forbidden if not logged in/JWT invalid
    return{
        data: response.data,
        status: response.status
    }
}

export default {
    getAllNotebooksAPI,
    getDataNotebookAPI,
    createNotebookAPI,
    deleteNotebookAPI,
    updateNotebookAPI,
    getNotebookAvailabilityAPI
}