<template>
    <div class="page-frame">
        <CursorToolbar/>
        <CreateToolbar/>
        
        <svg class="workspace-svg" ref="workspace" 
        :viewBox="'0,0,' + state.windowWidth + ',' + state.windowHeight" 
        @mousemove="handleMouseMove" 
         @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <rect :x="state.pageCentre.x - (route.query.width / 2)" 
            :y="state.pageCentre.y - (route.query.height / 2)"
            :width="route.query.width" 
            :height="route.query.height" style="fill:white"/>
            <g id="artboard1Group">

                <rect v-for="path in state.paths.filter(p => p.type == 'square')" 
                :x="path.object.x" :y="path.object.y"
                :width="path.object.width" :height="path.object.height"
                :id="path.object.id"  ref="squareRefs"
                :fill="path.object.fill" :stroke="path.object.strokeColor" :stroke-width="path.object.strokeWidth"
                />
                <circle v-for="path in state.paths.filter(p => p.type == 'circle')"
                    :cx="path.object.x" :cy="path.object.y"
                    :r="path.object.radius" 
                    :id="path.object.id" ref="circleRefs"
                    :fill="path.object.fill" :stroke="path.object.strokeColor" :stroke-width="path.object.strokeWidth"
                    />
                <path v-for="path in state.paths.filter(p => p.type == 'curve')"
                    :d="path.object.pointsString" :fill="path.object.fill" 
                    :stroke="path.object.strokeColor" :stroke-width="path.object.strokeWidth"
                />

                <g id="userInterface">

                    <rect v-for="path in state.selectedPaths.filter(path => path.type == 'square')"
                        :x="path.object.x" :y="path.object.y" :width="path.object.width"
                        :height="path.object.height"
                        fill="none" stroke="#B8B7FF" stroke-width="0.5" stroke- stroke-dasharray="5,1"
                     />

                    <circle v-for="path in state.selectedPaths.filter(path => path.type == 'circle')"
                        :cx="path.object.x" :cy="path.object.y" :r="path.object.radius"
                        fill="none" stroke="#B8B7FF" stroke-width="0.5" stroke- stroke-dasharray="5,1"
                    />


                     
<!--                     this is for when we have the object selected and want to edit it.
    
    <circle v-if="state.selectedPath && state.selectedPath.type == 'square'"
                    :cx="state.selectedPath.object.x + (state.selectedPath.object.width/2) - 3 "
                    :cy="state.selectedPath.object.y + state.selectedPath.object.height" r="6" fill="#41cbfc"
                    />

                    <circle v-if="state.selectedPath && state.selectedPath.type == 'square'"
                    :cx="state.selectedPath.object.x + state.selectedPath.object.width"
                    :cy="state.selectedPath.object.y + (state.selectedPath.object.height / 2) - 3" r="6" fill="#41fbbc"
                    /> -->

                </g>
            </g>

        </svg>
    </div>
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue';
import {useRoute } from 'vue-router';

import {getPaths, getCurrentTool, setPaths, unselectAllPaths, getSelectedPath } from '../store';
import CreateToolbar from '../components/CreateToolbar.vue';
import CursorToolbar from '../components/CursorToolbar.vue';
import PathManager from '../components/PathManager.vue';

import Square from '../assets/js/Square';
import Circle from '../assets/js/Circle';


const squareRefs = ([])
const circleRefs = ([])
const route = useRoute()

const canvas = ref(null)
const workspace = ref(null)

onMounted(() => {
    initDoc()
    state.paths = getPaths();
})

const state = reactive({
    ctx: null,
    artboards: [],
    windowWidth: 0,
    windowHeight: 0,
    pageCentre: {x:0, y:0},
    paths: [],
    selectedPaths:[],
    isCreatingPath: false,
    isLongClick: false,
    isDown: false,
    mouse: {x: 0, y: 0 },
    createSelectionSquare: null

})
function handleMouseMove(e) {

    state.mouse = {x: e.clientX, y: e.clientY}
}

const initDoc = () => {  
    state.windowWidth= window.innerWidth - 10;
    state.windowHeight = window.innerHeight - 10;
    state.pageCentre.x = state.windowWidth / 2;
    state.pageCentre.y = state.windowHeight / 2;
}
const setLongClick = () => {
    state.isLongClick = true;
    console.log('Ready to draw')
}

const unsetLongClick = () => {
    state.isLongClick = false;
}

function handleMouseDown(e) {
    clearTimeout(setLongClick)
    unsetLongClick();
    state.isDown = true;
    setTimeout(setLongClick, 50)
    setTimeout(handleMouseHold, 250)
    let currentTool = getCurrentTool();
    if(currentTool.name == 'curve' ){
        if (!state.isCreatingPath) {
            unselectAllPaths()
            state.paths.push({
                type: currentTool.name, 
                selected: true,
                object: currentTool.object(state.mouse.x, state.mouse.y)
            })
            state.isCreatingPath = true;
        } else {
            state.selectedPaths[0].object.addPoint(undefined, {x: state.mouse.x, y: state.mouse.y})
        }
    }
    
    
}

const handleMouseHold = () => {
    console.log(`isDown: ${state.isDown} isLongClick: ${state.isLongClick}`)
    if(state.isDown && state.isLongClick) {
        let currentTool = getCurrentTool()
        if(currentTool.name == 'square') {
            unselectAllPaths()
            state.paths.push(Square.createSquare(state.mouse, state.paths.length))
        }
        else if (currentTool.name == 'circle') {
            unselectAllPaths()
            state.paths.push(Circle.createCircle(state.mouse, state.paths.length))
    
        }
        document.addEventListener('mousemove', handleMouseDrag)
    }
}

function handleMouseDrag(e) {
    let currentTool = getCurrentTool()
    if(currentTool.name == 'circle' || currentTool.name == 'square') {

        state.paths[state.paths.length- 1].object.adjustSize(e.movementX, e.movementY);
    } else if (currentTool.name == 'select') {
        
        state.selectedPaths = state.paths.filter(p=> p.selected == true);
        state.selectedPaths.forEach(path => path.object.adjustPosition(e.movementX, e.movementY));
    } 
}

function handleMouseUp(e) {
    clearTimeout(setLongClick)
    clearTimeout(handleMouseHold)
    unsetLongClick()
    state.isDown = false;
    setPaths(state.paths)
    state.selectedPaths = state.paths.filter(p=> p.selected == true);
    document.removeEventListener('mousemove', handleMouseDrag)
}

const calculateCenter = (value1=0 , value2) => {
    return (value1 + value2) / 2;
}


document.addEventListener('resize', ()=> {
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;
    state.pageCentre.x = state.windowWidth / 2;
    state.pageCentre.y = state.windowHeight / 2;
})
</script>

<style>
canvas {
    background-color:rgb(139, 139, 139);
    position:fixed;
    top:0;
    left:0;
}
.workspace-svg {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:transparent; 
    z-index:19;

}
</style>