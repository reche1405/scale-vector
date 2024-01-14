<template>
    <div class="create-toolbar__wrapper">

        <button @click="setTool('select')">Select</button>
        <button @click="setTool('point')">Point</button>
        <button @click="setTool('square')">Square</button>
        <button @click="setTool('circle')">Circle</button>
        <button @click="setTool('line')">Line</button>
        <button @click="setTool('curve')">Curve</button>
    </div>
</template>

<script setup>
import { setTool } from '../store';

</script>

<style>
.create-toolbar__wrapper {
    position:absolute;
    left:0;
    top:5rem;
    z-index:50;
    background-color:#282828;
    display:grid;
    grid-template-columns: repeat(2, 1fr);

}

</style>