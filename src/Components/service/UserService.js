import axios from "axios"

class UserService{
    static BASE_URL = "http://localhost:8082"

    static async login(username, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {username, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, 
            {
                headers: {Authorization: `Bearer ${token}`,'Content-Type': 'application/json'}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getUserByUsername(username, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/adminuser/getdata/${username}`, username, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async applyForLeave(token, username, reason) {
        try {
            const response = await axios.post(
                `${UserService.BASE_URL}/user/apply-leave`, 
                { username, reason },
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (err) {
            console.error('Error applying for leave:', err.response ? err.response.data : err.message);
            throw err;
        }
    }



    static async getAllLeaveRequests(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/getLeaves`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateLeaveStatus(token, username, action) {
        try {
            const response = await axios.put(
                `${UserService.BASE_URL}/admin/update/${username}`, 
                { status: action },  // Send the action as a payload in the body
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getStatus(token, username) {
        try {
            const response = await axios.get(
                `${UserService.BASE_URL}/user/status/${username}`,
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async confirmLeaveStatus(token, username) {
        try {
            const response = await axios.delete(
                `${UserService.BASE_URL}/user/deleteleave/${username}`,
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    

}

export default UserService;