import axios from "axios";

const url = `https://movie-picker-db.herokuapp.com/movies/`;


export const addMovie = async(details) => {
    console.log('Adding movies here with this details :', details);
    const apiUrl = `${url}addMovie`;

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


export const getMovies = async() => {
    console.log('Getting movies:');
    const apiUrl = `${url}getAllMovies`;
    try{
        const res = await axios.get(apiUrl);
        console.log(res);
        return res.data;
    }
    catch(err){
        console.log(err);
        return err
    }
}

export const getRandomMovie = async() => {
    console.log('Random movies:');
    const apiUrl = `${url}randomMovie`;
    try{
        const res = await axios.get(apiUrl);
        console.log(res);
        return res.data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}