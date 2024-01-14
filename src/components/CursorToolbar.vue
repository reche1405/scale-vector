<template>
    <div class="cursor-toolbar__wrapper">

        <div v-if="getCurrentTool().name == 'square'" class="cursor-toolbar">
    
            <span>W:</span>
            <input v-model="state.square.width" type="number"/>
            <span>H:</span>
            <input v-model="state.square.height" type="number"/>
            <span>X:</span>
            <input v-model="state.square.x" type="number"/>
            <span>Y:</span>
            <input v-model="state.square.y" type="number"/>
        </div>
    </div>
</template>

<script setup>
import { getCurrentTool } from '../store';
import { reactive } from 'vue';

const state = reactive({
    square: {
        width: 500,
        height: 500,
        x: 200,
        y: 200
    }
})


</script>

<style>
.cursor-toolbar__wrapper {
    top:0;
    position:absolute;
    left:0; 
    width:100%;z-index:20;
}
.cursor-toolbar {
    width:100%;
    background-color:#282828;
    padding:0.5rem;
    z-index:20;
}
</style>