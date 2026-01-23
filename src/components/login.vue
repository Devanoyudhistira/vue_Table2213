<script>
import supabase from '@/library/supabase';
export default {
    methods: {
        async login(email, password) {
            const useremail = this.$refs.email.value
            const userpassword = this.$refs.password.value
            const { error } = await supabase.auth.signInWithPassword({
                email: useremail,
                password: userpassword,
            })

            console.log(error)
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
    }
}

</script>



<template>
    <main class="w-screen h-screen bg-linear-to-bl from-violet-200 to-fuchsia-100 flex justify-center items-center ">
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
            <label class="absolute right-10 top-86" for="seepassword">
                <i ref="eyeicon" class="bi bi-eye text-3xl relative left-4 bottom-2"></i>
                <input class="z-1000 opacity-0" @change="seepassword" type="checkbox" name="" id="seepassword">
            </label>
            <button
                class="font-work cursor-pointer text-zinc-200 text-3xl px-2 py-1 bg-blue-600 hover:scale-95 hover:text-blue-500 hover:bg-zinc-100 hover:border-blue-600 transition rounded-xl border-sky-500 border">
                Sign In
            </button>
        </form>
        <div class="w-full h-screen bg-linear-to-t from-sky-400 to-blue-400 flex items-center justify-start">
            <h1 class="w-[80%] ml-10 text-6xl text-zinc-100 font-inter font-semibold"> Start managing your data here
                with a simple <span class="text-emerald-500 font-bold"> Click </span></h1>
        </div>
    </main>
</template>
