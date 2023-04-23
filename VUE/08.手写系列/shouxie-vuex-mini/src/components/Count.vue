<template>
    <div>
        <button @click="add">{{ count }}</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store/mini-vuex';  

let store = useStore();
let count = computed(() => store.state.count);

function add() {
    store.commit('add');
}
</script>