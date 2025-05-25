import axios from "axios";

const url = `https://bucketlist-app-navy.vercel.app/bucketList/`;


export const addIteminBucketList = async(details) => {
    console.log('Adding item here with this details :', details);
    const apiUrl = `${url}addItem`;

    try{
        const res = await axios.post(apiUrl,details);
        console.log(res);
        return res.data
    }
    catch(err){
        console.log(err)
        return err
    }
}


export const getAllItems = async(urgency) => {
    console.log('Getting items:');
    const apiUrl = `${url}getAllItems`;
    try{
        const res = await axios.post(apiUrl, {'urgency': urgency});
        console.log(res);
        return res.data;
    }
    catch(err){
        console.log(err);
        return err
    }
}

export const getRandomItem = async(urgency) => {
    console.log('Random items:');
    const apiUrl = `${url}randomItem`;
    try{
        const res = await axios.post(apiUrl, {'urgency': urgency});
        console.log(res);
        return res.data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export const updateItem = async(details) => {
    console.log('Updating movies here with this details :', details);
    const apiUrl = `${url}updateItem`;

    try{
        const res = await axios.post(apiUrl,details);
        console.log(res);
        return res.data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export const deleteItem = async(details) => {
    console.log('Deleting movies here with this details :', details);
    const apiUrl = `${url}deleteItem`;

    try{
        const res = await axios.post(apiUrl,details);
        console.log(res);
        return res.data
    }
    catch(err){
        console.log(err)
        return err
    }
}