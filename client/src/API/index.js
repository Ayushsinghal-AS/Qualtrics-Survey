import  axios  from 'axios';

const token = "token from storage"
const authPost = async(url , payload)=>{
    try {
    const {data , status} = await axios.post(url , payload , {autherization: token}) ;
    return data;
    } catch (error) {
        return error
    }
};

const post = async(url , payload)=>{
    try {
       const {data , status} = await axios.post(url , payload);
       return data;
    } catch (error) {
        return error
    }
}

const getfunc = async(url)=>{
    try {
        const {data , status} = await axios.get(url,{headers:{
            "ngrok-skip-browser-warning":"true"
        }}) ;
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
}

const authGet = async(url)=>{
    try {
        const {data , status} = await axios.get(url , {autherization: token}) ;
        return data;
    } catch (error) {
        return error
    }
}

export const requestAPI ={
    authPostAPI : async(url , payload)=> await authPost(url , payload),
    postAPI : async(url , payload)=> await post(url , payload),
    getAPI : async(url)=> await getfunc(url),
    authGetAPI : async(url)=> await authGet(url)
}

