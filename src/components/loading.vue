<script>
import {
    VueSpinnerFacebook
} from 'vue3-spinners';

export default {
    components: {
        VueSpinnerFacebook,
    },
};
</script>


<template>
    <div class="flex flex-col gap-1" >
        <VueSpinnerFacebook size="130" color="blue" />
        <h1 class="font-work -mt-1 text-4xl text-blue-700 font-bold">Loading</h1>
    </div>
</template>