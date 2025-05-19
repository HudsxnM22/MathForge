import axios from "axios"
import useUserStore from "../hooks/useUserStore"
import useUserNotebookAvailStore from "../hooks/userNotebookAvailStore"
import useUserNotebookStore from "../hooks/useUserNotebookStore"

const API_URL = "/api/" //TODO change to https when deployed
axios.defaults.withCredentials = true

//returns object with data and status for auth handling, also handles global state updates
const loginAPI = async ({email, password}) => {
    const setLogInState = useUserStore.getState().setLogIn

    const logInRequest = {
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
            useUserNotebookStore.getState().setNotebooks([]); //clears already stored notebooks of previous session
        }
    }catch(error){
        return {
            status: 403
        }
    }

    return {
        data: response.data,
        status: response.status
    }
}

//returns object with data and status for auth handling, also handles global state updates
const registerAPI = async ({email, password}) => {
    const setLogInState = useUserStore.getState().setLogIn

    const registerRequest = {
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
        return {
            status: 409
        }
    }

    return {
        data: response.data,
        status: response.status
    }
}

//if status 403 redirect to login page if JWT is expired
//also returns a user response same as login and register, so this is used upon paghe refresh to login via JWT aswell
const refreshAPI = async () => {
    const setLogInState = useUserStore.getState().setLogIn

    let response;
    try{
        response = await axios.get(API_URL + "refresh")
        if(response.status == 202){
            setLogInState({
                email: response.data.email
            })
        }

    }catch(error){
        return {
            status: 403
        }
    }

    return {
        status: response.status
    }
}

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

    const resetRequest = {
        email: email,
    }

    let response;
    try{
        response = await axios.post(API_URL + "reset-password", resetRequest)

    }catch(error){
        return {
            status: 202//returns 202 good no matter what. so you cant tell if email is already in the db
        }
    }

    return {
        status: response.status
    }
}

//code is a string
//returns a short lived JWT access token
const validateResetPasswordAPI = async ({ email, code }) => {

    const validateRequest = {
        email: email,
        code: code
    }

    let response;
    try{
        response = await axios.post(API_URL + "reset-password/validate", validateRequest)
    }catch(error){
        return {
            status: 400
        }
    }

    return {
        status: response.status
    }
}

//if 202 then reroutes to login
const confirmResetPasswordAPI = async ({ password }) => {
    
    const confirmRequest = {
        password: password
    }

    let response;
    try{
        response = await axios.post(API_URL + "reset-password/confirm", confirmRequest)
    }catch(error){
        return {
            status: 400
        }
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