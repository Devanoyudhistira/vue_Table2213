<script>
import supabase from '@/library/supabase';
export default {
    data(){
       return {
        loginError:false,
       }
    },
    methods: {
        async login() {
            const useremail = this.$refs.email.value
            const userpassword = this.$refs.password.value
            const { error } = await supabase.auth.signInWithPassword({
                email: useremail,
                password: userpassword,
            })
            this.loginError =  true
            
        },
        seepassword() {
            let password = this.$refs.password
            if (password.type === "password") {
                password.type = "text"
                this.$refs.eyeicon.classList.replace('bi-eye-slash', 'bi-eye')
            }
            else {
                this.$refs.eyeicon.classList.replace('bi-eye', 'bi-eye-slash')
                password.type = "password"
            }
        },
    },
    computed:{
        isError(){
            return this.loginError ? "bg-linear-to-t from-red-700 to-red-500" : "bg-linear-to-t from-sky-400 to-blue-400"
        },
        isErrorMessage(){
            return this.loginError ? "Your credential is wrong try again" : "Start managing your data here with a simple "
        }
    }
}

</script>



<template>
    <main class="w-screen h-screen bg-linear-to-bl from-zinc-200 to-zinc-100 flex flex-col lg:flex-row justify-center items-center ">
        <form @submit.prevent="login"
            class="relative h-screen w-full flex flex-col gap-2 justify-center border-sky-500 border-r-2 px-6 py-8">
            <h1 class="text-3xl -mt-10 font-work font-semibold text-zinc-900"> Sign in as an <span
                    class="text-sky-500 font-bold">Admin </span></h1>
            <label class="labelclass" for="email">
                <h2 class="inputname"> Email </h2>
                <input ref="email" class="authinput" type="email" id="email">
            </label>
            <label class="labelclass" for="email">
                <h2 class="inputname"> Password </h2>
                <input ref="password" class="authinput" type="password" id="password">
            </label>
            <label class="absolute right-9 top-49.5 lg:-right-12 lg:top-86 " for="seepassword">
                <i ref="eyeicon" class="bi bi-eye text-3xl relative lg:-left-20 lg:top-8 left-4 bottom-2"></i>
                <input class="z-1000 opacity-0" @change="seepassword" type="checkbox" name="" id="seepassword">
            </label>
            <button
               :class="isError" class="font-work cursor-pointer text-zinc-200 text-3xl px-2 py-1 hover:scale-95 hover:text-blue-500 hover:bg-zinc-100 hover:border-blue-600 transition rounded-xl border">
                Sign In
            </button>
        </form>
        <div class="w-full h-screen transition-colors flex items-center justify-start" :class="isError" >
            <h1 class="w-[80%] ml-10 lg:text-6xl text-4xl text-zinc-100 font-inter font-semibold"> 
                {{isErrorMessage}}
                 <span v-show="!loginError" class="text-emerald-500 font-bold"> Click </span></h1>
        </div>
    </main>
</template>
