<script>
export default {
    props: ["logout","loginnow"],
    data() {
        return {
            modal: false
        }
    },
    methods: {
        openmodal() {
            this.modal = !this.modal
        },
    },
}
</script>

<template>
    <nav class="fixed w-screen h-12 py-1 px-2 top-0 left-0 bg-blue-400  flex justify-between items-center ">
        <h1 class="text-2xl font-work font-semibold "> Namauser </h1>
        <div @click.stop="openmodal" class="flex flex-col gap-2 w-max h-max ">
            <div class="w-10 h-1 bg-zinc-100  "></div>
            <div class="w-10 h-1 bg-zinc-100  "></div>
            <div class="w-10 h-1 bg-zinc-100  "></div>
        </div>
        <Transition name="navmodal">
            <div v-if="modal" class="fixed top-12 p-2 right-5 bg-zinc-200 w-45 h-max flex flex-col">
                <h1 class="font-inter font-semibold text-md tracking-tight border-b border-b-white">
                    devanotira@gmail.com </h1>
                <button @click="logout" class="text-md w-full font-work font-bold rounded-xl bg-red-700 "> Log Out </button>
            </div>
        </Transition>
    </nav>
</template>
