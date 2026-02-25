<script>
export default {
    props: ["status", "closeFlash", "showflash"],
    data() {
        return {
            flash: this.showflash
        }
    },
    computed: {
        statusStyle() {
            return this.status ? "bg-sky-500 border-blue-800" : "bg-red-500/80 border-red-700"
        },
        statusMessage() {
            return this.status ? "action result in success" : "we encounter an error please try again"
        },
        statusIcon() {
            return this.status ? "bi-check-circle-fill text-blue-200" : "bi-x-circle-fill text-red-700"
        },
    },
    mounted(){
        console.log(this.flash)
    },
}
</script>

<template>
    <div class="fixed top-14 md:left-135 left-13 w-70 h-20 z-999 md:w-90 md:h-30 justify-center items-start border-3 rounded-2xl border-blue-800 flex flex-col"
        :class="statusStyle">
        <button @click="() => closeFlash()" :class="this.status ? '-mt-4 md:-mt-9' : '-mt-2'" class="cursor-pointer self-end "> <i class="bi bi-x text-3xl "></i>
        </button>
        <div class="flex w-full justify-between items-center  px-1.5">
            <h1 class="font-inter text-xl w-max md:text-2xl font-medium"> {{ statusMessage }} </h1>
            <i class="bi text-3xl" :class="statusIcon"></i>
        </div>
    </div>
</template>