<template>
    <div class="home-card">
        <div class="my-projects__wrapper">
            <h2>A list of all of your projects</h2>
            <li>Old Project 1</li>
            <li>Old Project 2</li>
        </div>
        <div class="new-project__wrapper">
            <div class="new-project__grid">
                <span>Title</span>

                <input v-model="state.title" type="text" name="title" id="">
                <span>Width:</span>
                <input v-model="state.width" type="number" name="width" id="">
                <span>Height:</span>
                <input v-model="state.height" type="number" name="height" id="">
                <span>Units:</span>
                <select v-model="state.selectedUnitsselectedUnits">
                    <option v-for="unit in state.availableUnits" v-bind:key="unit"
                    :value="unit">{{ unit }}</option>
                </select>
               
                <button @click="createDocument">CREATE</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const createDocument = () => {
    router.push({name: 'workspace', query: {title: state.title, height:state.height, width:state.width}})
}

const state = reactive({
    width:500,
    height:500,
    availableUnits: ['px', 'cm', 'in'],
    selectedUnits: 'px',
    title: 'New Project'
})
</script>

<style>
.home-card {
    display:flex;
    padding:2rem;
    box-shadow:10px 10px 10px 3px rgba(0,0,0,0.8);
    border-radius: 1rem;
}
.new-project__grid {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>