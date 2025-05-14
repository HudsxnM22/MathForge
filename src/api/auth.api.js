import axios from "axios"
import useUserStore from "../hooks/useUserStore"
import useUserNotebookAvailStore from "../hooks/userNotebookAvailStore"

const API_URL = "http://localhost:8080/"

//returns object with data and status for auth handling, also handles global state updates
const loginAPI = async ({email, password}) => {
    const setLogInState = useUserStore.getState().setLogIn

    logInRequest = {
        email: email,
        password: password
    }


    let response;
    try{
        response = await axios.post(API_URL + "login", logInRequest)

        if(response.status == 200){
            setLogInState({
                email: response.data.email
            })
        }
    }catch(error){
        console.error('Login API error' + error);
    }

    return {
        data: response.data,
        status: response.status
    }
}

//returns object with data and status for auth handling, also handles global state updates
const registerAPI = async ({email, password}) => {
    const setLogInState = useUserStore.getState().setLogIn

    registerRequest = {
        email: email,
        password: password
    }

    let response;
    try{
        response = await axios.post(API_URL + "register", registerRequest)

        if(response.status == 201){
            setLogInState({
                email: response.data.email
            })
        }
    }catch(error){
        console.error('Register API error' + error);
    }

    return {
        data: response.data,
        status: response.status
    }
}

//if status 403 redirect to login page if JWT is expired
const refreshAPI = async () => {

    let response;
    try{
        response = await axios.get(API_URL + "refresh")

    }catch(error){
        console.error('Register API error' + error);
    }

    return {
        data: response.data,
        status: response.status
    }
}

//TODO clears http only jwt cookie, test this
const logoutAPI = async () => {
    const setLogOutState = useUserStore.getState().setLogOut

    let response;
    try{
        response = await axios.post(API_URL + "logout")

        if(response.status == 200){
            setLogOutState()
        }

    }catch(error){
        console.error('Register API error' + error);
    }
    
    return {
        data: response.data,
        status: response.status
    }
}

//reset password api calls -----------------------------

const resetPasswordAPI = async ({ email }) => {

    resetRequest = {
        email: email,
    }

    let response;
    try{
        response = await axios.post(API_URL + "register", resetRequest)

    }catch(error){
        console.error('Register API error' + error);
    }

    return {
        status: response.status
    }
}

//code is a string
//returns a short lived JWT access token
const validateResetPasswordAPI = async ({ email, code }) => {

    validateRequest = {
        email: email,
        code: code
    }

    let response;
    try{
        response = await axios.post(API_URL + "register", validateRequest)
    }catch(error){
        console.error('Register API error' + error);
    }

    return {
        status: response.status
    }
}

//if 202 then reroutes to login
const confirmResetPasswordAPI = async ({ password }) => {
    
    confirmRequest = {
        password: password
    }

    let response;
    try{
        response = await axios.post(API_URL + "register", confirmRequest)
    }catch(error){
        console.error('Register API error' + error);
    }

    return {
        status: response.status
    }
}

export default {
    loginAPI,
    registerAPI,
    refreshAPI,
    logoutAPI,
    resetPasswordAPI,
    validateResetPasswordAPI,
    confirmResetPasswordAPI
}