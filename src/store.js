import { reactive } from 'vue';
import Square from './assets/js/Square';
import Circle from './assets/js/Circle';
import Path from './assets/js/Path';

const toolOptions = [
    {name: 'select'},
    {name: 'point'},
    {
        name: 'square', object:(x,y,w,h) =>  new Square(x,y,w,h)
    },
    {name: 'circle', object:(x,y,r) => new Circle(x,y,r)},
    {name: 'curve', object:(x,y) => new Path(x,y)},
    {name: 'line'},
]

const store = reactive({
    selectedTool: toolOptions[2],
    paths: [
    ]
})

export const setTool = (tool) => {
    store.selectedTool = toolOptions.find(t => t.name == tool);
    
    console.log(store.selectedTool);
}

export const getCurrentTool = () => {
    return store.selectedTool
}

export const getPaths = () => {
    return store.paths;
}

export const setPaths = (paths) => {
    store.paths = paths;
}

export const unselectAllPaths = () => {
    for(let i = 0; i < store.paths.length; i++) {
        store.paths[i].selected = false;
    }
}

export const getSelectedPath = () => {
    return store.paths.find(p => p.selected == true)

}

