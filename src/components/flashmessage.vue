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
            return this.status ? "bg-sky-500/50 border-blue-800" : "bg-red-600/50 border-red-700"
        },
        statusMessage() {
            return this.status ? "action result in success" : "we encounter an error please try again"
        },
        statusIcon() {
            return this.status ? "bi-check-circle-fill text-emerald-400" : "bi-x-circle-fill text-red-700"
        },
    },
    mounted(){
        console.log(this.flash)
    },
}
</script>

<template>
    <div class="fixed top-14 left-135 w-70 h-20 justify-center items-start border-b-2 border-t-2 flex flex-col"
        :class="statusStyle">
        <button @click="() => closeFlash()" class="cursor-pointer self-end -mt-4"> <i class="bi bi-x text-3xl "></i>
        </button>
        <div class="flex w-full justify-between items-center  px-1.5 -mt-2">
            <h1 class="font-work text-[15px] font-semibold"> {{ showflash }} {{ statusMessage }} </h1>
            <i class="bi text-3xl" :class="statusIcon"></i>
        </div>
    </div>
</template>