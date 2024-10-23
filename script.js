//myCanvas.width=400;
//myCanvas.height=300;
//const margin=30;
// const n=20;
/*const array=[4,6,7,1,88,65];

//for(let i=0;i<n;i++){
  //  array[i]=Math.random();
//}
//console.log(array);

const cols=[];
const spacing=(myCanvas.width-margin*2)/n;
const ctx=myCanvas.getContext("2d");

const maxColumnHeight=200;

for(let i=0;i<array.length;i++){
    const x=i*spacing+spacing/2+margin;
    const y=myCanvas.height-margin-i*3;
    const width=spacing-4;
    const height=maxColumnHeight*array[1];
    cols[i]=new Column(x,y,width,height);
    
}

let moves=bubbleSort(array);
animate();

function bubbleSort(array){
    const moves=[];
   for(var i=0;i<array.length;i++){
    for(var j=0;j<(array.length-i-1); j++){
        if(array[j]>array[j+1]){
            var temp=array[j]
            array[j]=array[j+1]
            array[j+1]=temp
            moves.push(
                {indices:[i-1,i],swap:true}
            );
            
        }
        else{
            moves.push(
                {indices:[i-1,i],swap:false}
            );
        }
    }
   }
   return moves;
}

function animate(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    for(let i=0;i<cols.length;i++){
        cols[i].draw(ctx);
    }
    requestAnimationFrame(animate);
}**/

const container = document.getElementById("container");
const generateButton = document.getElementById("generateButton");
const bubbleSortButton = document.getElementById("bubbleSortButton");
const selectionSortButton = document.getElementById("selectionSortButton");
const insertionSortButton = document.getElementById("insertionSortButton");

const mergeSortButton = document.getElementById("mergeSortButton");
const quickSortButton = document.getElementById("quickSortButton");
const shellSortButton = document.getElementById("shellSortButton");


let bars = [];
let delay = 100;
const emptyArray = new Array();
function generateArray(inputarray) {
    bars = [];
    //const sanitizedInput = inputarray.replace(/[^0-9,]/g, '');
    //const height1 = inputarray.split(/[,]+/).map(Number);
    //console.log(inputarray.length);
    for (let i = 0; i < inputarray.length/2; i++) {
        //const height1= inputarray.split(",");
        const height1 = inputarray.split(/[,]+/).map(Number);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height= height1[i]+ "px";
        container.appendChild(bar);
        console.log(bar);
        bars.push(bar);
    }
    
 
}

function swapBars(i, j) {
    const temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
}

async function
 bubbleSort() {
    disableButtons();
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                swapBars(j, j + 1);
                await delayAnimation();
            }
        }
    }
    enableButtons();
}

async function 
 selectionSort() {
    disableButtons();
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;   
                console.log(minIndex);
            }
        }
        swapBars(i, minIndex);
        await delayAnimation();
    }
    enableButtons();
}

async function insertionSort() {
    disableButtons();
    for(let i=0;i<bars.length;i++){
        let key=parseInt(bars[i].style.height);
        let j=i-1;
        while(j>=0 && parseInt(bars[j].style.height)>key){
            swapBars(j,j+1);
            j--;
            await delayAnimation();
        }
        bars[j + 1].style.height = `${key}px`;
        enableButtons();
    }
    
}

async function mergeSort() {
    await mergeSortHelper(0, bars.length - 1);
  }
  
  async function mergeSortHelper(low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
  
      await mergeSortHelper(low, mid);
      await mergeSortHelper(mid + 1, high);
  
      await merge(low, mid, high);   
  
    }
  }
  
  async function merge(low, mid, high) {
    const leftArray = [];
    const rightArray = [];
  
    for (let i = low; i <= mid; i++) {
      leftArray.push(parseInt(bars[i].style.height));
    }
  
    for (let i = mid + 1; i <= high; i++) {
      rightArray.push(parseInt(bars[i].style.height));
    }
  
    let i = 0;
    let j = 0;
    let k = low;
  
    while (i < leftArray.length && j < rightArray.length)   
   {
      if (leftArray[i] <= rightArray[j]) {
        bars[k].style.height = `${leftArray[i]}px`;
        i++;
      } else {
        bars[k].style.height = `${rightArray[j]}px`;
        j++;
      }
      k++;
      await delayAnimation();
    }
  
    while (i < leftArray.length) {
      bars[k].style.height = `${leftArray[i]}px`;
      i++;
      k++;
      await delayAnimation();
    }
  
    while (j < rightArray.length) {
      bars[k].style.height = `${rightArray[j]}px`;
      j++;
      k++;
      await delayAnimation();
    }
  }

async function quickSort() {
    
    await quickSortHelper(0, bars.length - 1);
    
    
}
  
  async function quickSortHelper(low, high) {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);

      
    }
  }
  
  async function partition(low, high) {
    const pivotValue = Math.floor(Math.random() * (high - low + 1)) + low;
    let i = low - 1;
    console.log(i);
    for (let j = low; j < high; j++) {
      if (parseInt(bars[j].style.height) <= pivotValue) {
        i++;
        swapBars(i, j);
        await delayAnimation();
        
      }
    }
  
    swapBars(i + 1 , high);
    return i + 1;
  }
  async function shellSort() {
    disableButtons();
  
    let n = bars.length;
    let gap = Math.floor(n / 2);
  
    // Keep reducing the gap size by half until it becomes 1
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let key = bars[i];
        let j = i - gap;
  
        // Insert key into the sorted subarray
        while (j >= 0 && bars[j].style.height > key.style.height) {
          swapBars(j, j + gap);
          j -= gap;
          await delayAnimation();
        }
        bars[j + gap] = key;
      }
      gap = Math.floor(gap / 2);
    }
  
    enableButtons();
  }
function disableButtons() {
    generateButton.disabled = true;
    bubbleSortButton.disabled = true;
    insertionSortButton.disabled = true;
    selectionSortButton.disabled = true;
    mergeSortButton.disabled = true;
    quickSortButton.disabled = true;
    shellSortButton.disabled=true;
}

function enableButtons() {
    generateButton.disabled = false;
    bubbleSortButton.disabled = false;
    insertionSortButton.disabled = false;
    selectionSortButton.disabled = false;
    mergeSortButton.disabled = false;
    quickSortButton.disabled = false;
    shellSortButton.disabled=false;
}

async function delayAnimation() {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}


function myFunction() {
    const container = document.createElement('div');
    container.innerHTML = `
       <div>
        Enter Elements to sort: <input type="Numbers" id="custom_array"></input>
        <button type="submit" value="Submit" onclick="showAlert()">Submit</button>
    </div>
    `;
    document.body.appendChild(container);
   
  
}

function showAlert() {
    const customArrayInput = document.getElementById('custom_array');
    const customArrayValue = customArrayInput.value;
    console.log(customArrayInput.length);

    console.log(customArrayValue);
    if (customArrayValue === '') {
        alert('Please enter elements to sort.');
    } else {
        alert('You entered: ' + customArrayValue);
    }
    generateButton.addEventListener("click", generateArray(customArrayValue));
}

function cleanup() {
  
  const temporaryElements = document.querySelectorAll('.temporary-element');
  temporaryElements.forEach(element => element.remove());

  // Reset properties of existing elements:
  const elementsToReset = document.querySelectorAll('.element-to-reset');
  elementsToReset.forEach(element => {
    element.style.height = 'initial'; // Or reset to any other desired value
    // Reset other properties as needed
  });


}

generateButton.addEventListener("click", myFunction);
bubbleSortButton.addEventListener("click", bubbleSort);
insertionSortButton.addEventListener("click", insertionSort);
//selectionSortButton.addEventListener("click", selectionSort); 

    
