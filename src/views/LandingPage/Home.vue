<template>
    

    <div class="flex-container">
        <div class="border" @click="setValue(1)">Add Item</div>
        <div class="border" @click="setValue(2)" >View Long-Term BucketList</div>
        <div class="border" @click="setValue(3)">View Short-Term Goals</div>
        <div class="border" @click="[setValue(4), changePrediction($event, urgency=false)]" >Pick Long-Term Item</div>
        <div class="border" @click="[setValue(5), changePrediction($event, urgency=true)]" >Pick Short-Term Item</div>

    </div>


    <div class="formdata" v-show="pageSelected == 1">
        <input type="text" placeholder="Enter Item in BucketList..." v-model="movieName">
        <input type="text" placeholder="Please enter your name..." v-model="userName">
         <div class="toggle-section">
            <label class="toggle-label">Long-Term Goal:</label>
                <button @click="toggle" :class="['px-6 py-2 rounded-lg text-white transition-colors duration-300', isYes ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600']">
                    {{ isYes ? 'Yes' : 'No' }}
                 </button>
        </div>

    
        
        <button :disabled="!movieName || !userName" class="addButton" @click="insertMovie($event)"> ADD </button>


    </div>

    <div v-show="pageSelected == 2">
            <div class="view-movies" v-show="movieListLongTerm.length > 0">

                <div v-for="(movie,index) in movieListLongTerm" :key="index" class="movie-container">
                    
                        <div class="movie-name">{{ movie.name }}</div>
                        <div class="movie-username">{{ movie.added_by }}</div>
                    

                </div>

            

            </div>

            <div v-show="movieListLongTerm.length == 0">
                <img :src="Animation" alt="Loading image" class="custom-loader">
            </div>
        
    </div>

    <div v-show="pageSelected == 3">
            <div class="view-movies" v-show="movieListShortTerm.length > 0">

                <div v-for="(movie,index) in movieListShortTerm" :key="index" class="movie-container">
                    
                        <div class="movie-name">{{ movie.name }}</div>
                        <div class="movie-username">{{ movie.added_by }}</div>
                    

                </div>
            </div>

            <div v-show="movieListShortTerm.length == 0">
                <img :src="Animation" alt="Loading image" class="custom-loader">
            </div>     
    </div>


    <div v-show="pageSelected == 4">

        <div v-show="predictedMovieLongTerm.length != 0">
            <div class="random-movie">
                <div class="quotes">We finally are gonna complete:</div>
                <div class="surround">
                    
                    <div class="movie"> " {{ predictedMovieLongTerm }} "</div>
                    <button class="selectAnother" @click="changePrediction($event, false)">Change Activity</button>
                    
                </div>
                <div class="quotes">WE finally did it, Shir-bear! TOGETHER❤️</div>
                
            </div>

        </div>


        <div v-show="predictedMovieLongTerm.length == 0">
            <img :src="Animation" alt="Loading image" class="custom-loader">
        </div>

    </div> 

    <div v-show="pageSelected == 5">

        <div v-show="predictedMovieShortTerm.length != 0">
            <div class="random-movie">
                <div class="quotes">Today we are gonna:</div>
                <div class="surround">
                    
                    <div class="movie"> " {{ predictedMovieShortTerm }} "</div>
                    <button class="selectAnother" @click="changePrediction($event, true)">Change Activity</button>
                    
                </div>
                <div class="quotes">I love you, my bear ❤️. Always at your disposal. </div>
            </div>


        </div>


        <div v-show="predictedMovieShortTerm.length == 0">
            <img :src="Animation" alt="Loading image" class="custom-loader">
        </div>

    </div>


</template>

<script>
import { addIteminBucketList, getAllItems, getRandomItem, updateItem, deleteItem } from '@/utils/api.js';
import VueSingleSelect from "vue-single-select";
import vSelect from 'vue-select';
import Animation from "@/assets/LoadingAnimation.gif";
export default {
    data(){
        return{
            pageSelected : 1,
            movieListLongTerm : [],
            movieListShortTerm : [],
            movieName : '',
            userName : '',
            selectedMovie : '',
            predictedMovieShortTerm : '',
            predictedMovieLongTerm : '',
            isYes : false,
            Animation

        }
    },

    components:{
        VueSingleSelect
    },

    methods:{
        
        async loadMovies(urgency=false){
            try{
                print('Rishi urgency is :', urgency)
                const data = await getAllItems(urgency);
                if(data.success){
                    console.log(data.data)
                    if(urgency){
                        this.movieListShortTerm = data.data; 
                    }
                    else{
                        this.movieListLongTerm = data.data; 
                    }   
                }
            }
            catch(err){
                console.log('Err')
            } 
        },


        async useAddMovies(){

            
            const apiDetails = {
                name : this.movieName,
                username : this.userName,
                urgency : this.isYes
            }

            this.movieName = '';
            this.username = '';
            this.isYes = false


            try{
                const data = await addIteminBucketList(apiDetails)
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


        async useRandomMovie(urgency){
            
            try{
            const data = await getRandomItem(urgency);
            if(data.success){
                if(urgency){
                    this.predictedMovieShortTerm = data.data.name
                }
                else{
                    this.predictedMovieLongTerm = data.data.name
                }
                console.log('Predicted movie is :', this.predictedMovieShortTerm, this.predictedMovieLongTerm, data.data.name)
            }

            }
            catch(err){
                console.log(err)
                alert('Please try again! :(')
            }

        },

        changePrediction(e, urgency = false){
            e.preventDefault()
            this.predictedMovie = '';
            this.useRandomMovie(urgency);
        },


        setValue(val){
        
            this.pageSelected = val;
            console.log('Set val value is :', this.pageSelected)
        },

        insertMovie(e){
            console.log('Entering here');
            e.preventDefault();
            this.movieListLongTerm = [];
            this.movieListShortTerm = [];
            this.useAddMovies(e);

        },
        toggle() {
            this.isYes  = !this.isYes
        }
    },

    mounted(){
        this.loadMovies(false);
        this.loadMovies(true);
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