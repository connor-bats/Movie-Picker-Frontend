<template>
    

    <div class="flex-container">
        <div class="border" @click="setValue(1)">Add Movie</div>
        <div class="border" @click="setValue(2)" >See Movie List</div>
        <div class="border" @click="[setValue(3), changePrediction($event)]"  >Pick Movie</div>
        

    </div>


    <div class="formdata" v-show="pageSelected == 1">
        <input type="text" placeholder="Movie Name..." v-model="movieName">
        <input type="text" placeholder="Your name..." v-model="userName">
        
        <!-- <VueSingleSelect 
            v-model="userName"
            :options="['Moupali Saha', 'Rishi Raj Roy']"
            placeholder="Who are you?"
            :classes="{
                input: 'input-control'
            }"
            ></VueSingleSelect> -->
        
        <button :disabled="!movieName || !userName" class="addButton" @click="insertMovie($event)"> ADD </button>


    </div>

    <div v-show="pageSelected == 2">
            <div class="view-movies" v-show="movieList.length > 0">

                <div v-for="(movie,index) in movieList" :key="index" class="movie-container">
                    
                        <div class="movie-name">{{ movie.name }}</div>
                        <div class="movie-username">{{ movie.added_by }}</div>
                    

                </div>

            

            </div>

            <div v-show="movieList.length == 0">
                <img :src="Animation" alt="Loading image" class="custom-loader">
            </div>
        
    </div>


    <div v-show="pageSelected == 3">

        <div v-show="predictedMovie.length != 0">
            <div class="random-movie">
                <div class="quotes">The movie to be seen today is</div>
                <div class="surround">
                    
                    <div class="movie"> " {{ predictedMovie }} "</div>
                    <button class="selectAnother" @click="changePrediction($event)">Change Movie</button>
                    
                </div>
                
            </div>

        </div>


        <div v-show="predictedMovie.length == 0">
            <img :src="Animation" alt="Loading image" class="custom-loader">
        </div>

    </div> 


</template>

<script>
import { getMovies, addMovie, getRandomMovie } from '@/utils/api.js';
import VueSingleSelect from "vue-single-select";
import vSelect from 'vue-select';
import Animation from "@/assets/LoadingAnimation.gif";
export default {
    data(){
        return{
            pageSelected : 1,
            movieList : [],
            movieName : '',
            userName : '',
            selectedMovie : '',
            predictedMovie : '',
            Animation

        }
    },

    components:{
        VueSingleSelect
    },

    methods:{
        
        async loadMovies(){
            try{
                const data = await getMovies();
            if(data.success){
                console.log(data.data)
                this.movieList = data.data;
            
            }
            
            
            }
            catch(err){
                console.log('Err')
            } 
        },


        async useAddMovies(){

            
            const apiDetails = {
                name : this.movieName,
                username : this.userName
            }

            this.movieName = '';
            this.username = '';


            try{
                const data = await addMovie(apiDetails)
                if(data.success){
                    this.loadMovies();
                    alert('Movie inserted successfully!');
                }

                else{
                    alert('Please try again! :(');
                    
                }

            }catch(err){
                console.log(err);
                alert('Please try again! :(');
            }
        },


        async useRandomMovie(){
            
            try{
            const data = await getRandomMovie();
            if(data.success){
                this.predictedMovie = data.data.name

            }

            }
            catch(err){
                console.log(err)
                alert('Please try again! :(')
            }

        },

        changePrediction(e){
            e.preventDefault()
            this.predictedMovie = '';
            this.useRandomMovie();
        },


        setValue(val){
        
            this.pageSelected = val;
            console.log('Set val value is :', this.pageSelected)
        },

        insertMovie(e){
            console.log('Entering here');
            e.preventDefault();
            this.movieList = []
            this.useAddMovies(e);

        }
    },

    mounted(){
        this.loadMovies();
    },

    watch:{
        movieName : function(){
           console.log(this.movieName, this.userName) 
        },
        userName : function(){
           console.log(this.movieName, this.userName) 
        }


    }

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Philosopher:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
.flex-container{
    display : flex;
    justify-content: space-around;
    margin: 3rem;


}

.border{
    border: 0.5px solid #000;
    padding : 1rem;
    border-radius: 3rem;

}

.border:hover{
    background: rgba(125, 60, 152, 0.5) ;
}


.formdata{
    margin: auto;
    width: 50vw;
    height: 50vh;
    border-radius: 3rem;
    background: linear-gradient(#e66465, #9198e5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-family: Poppins, 'sans-serif';
    font-size: 1rem;
}
.formdata input{
    width: 15rem;
    height: 4rem;
    border: 0.5px solid #000;
    border-radius: 2rem;
    padding: 1rem;
    
}
.input-control{
    width: 15rem;
    height: 4rem;
    border: 0.5px solid #000;
    border-radius: 2rem;

}
.addButton{
    width: 5rem;
    height: 2rem;
    background-color: #F4D03F ;
    
}

.addButton:disabled{
    background-color:#BDC3C7 ;
    pointer-events: none;
    cursor: text;
}

.view-movies{
    width: 80vw;
    margin: auto;
    border: 1px #fff;
    background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100');
    background-position: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-radius: 3rem;


    
    


}

.movie-container{
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.53);
    border-radius: 3rem;
    border: 1px solid rgba(209, 213, 219, 0.3);
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.movie-name{
    font-family: Poppins, 'sans-serif';
    font-size: 3rem;

}

.movie-username {
    border: rgba(255, 255, 255, 0.53);
    color: #fff;
    background: #2ea44f;
    border-radius: 3rem;
    padding: 0.5rem;
    margin: 0.5rem;


}
.custom-loader{
    margin: auto;
}

.random-movie{

    width: 80vw;
    margin: auto;
    border: 1px #fff;
    background-image: url('https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80');
    background-position: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-radius: 3rem;
}

.surround{
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.53);
    border-radius: 3rem;
    border: 1px solid rgba(209, 213, 219, 0.3);
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.quotes{
    font-family: Poppins, 'san-serif';
    font-size: 5rem;
    color: #fff
}

.movie{
    font-size: 4rem;
    font-family: Philosopher, 'sans-serif';
    color: #fff;
}

.selectAnother{
    border: rgba(255, 255, 255, 0.53);
    color: #fff;
    background: #2ea44f;
    border-radius: 3rem;
    padding: 0.5rem;
    margin: 0.5rem;

}


</style>