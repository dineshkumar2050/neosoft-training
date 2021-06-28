import React from 'react'
import PropTypes from 'prop-types';

function merge(leftArr,rightArr,key){
    let resArr = [];
    if(typeof(leftArr[0] === ('string' || 'number'))){
        if(leftArr[0] < rightArr[0]){
            resArr.push(leftArr.shift());
        } else {
            resArr.push(rightArr.shift());
        }
    } else if(typeof(leftArr[0]) === 'object'){
        if(leftArr[0][key] < rightArr[0][key]){
            resArr.push(leftArr.shift());
        } else {
            resArr.push(rightArr.shift());
        }
    }
    return [...resArr,...leftArr,...rightArr];
}

function mergeSort(arr,key=null){
    let arrLength = arr.length;
    if(arrLength < 2) return arr;
    const leftArr = arr.splice(0,Math.ceil(arrLength/2));
    return merge(mergeSort(leftArr,key),mergeSort(arr,key),key);
}

function selectionSort(arr,key=null){
    let arrLength = arr.length;
    if(typeof(arr[0]) === ('string' || 'number')){
        for(let i = 0;i < arrLength;i++){
            for(let j = i + 1;j < arrLength;j++){
                if(arr[i] && arr[j]){
                    if(arr[i] > arr[j]){
                        [arr[i],arr[j]] = [arr[j],arr[i]];
                    }
                }
            }
        }
    } else if(typeof(arr[0]) === 'object'){
        for(let i = 0;i < arrLength;i++){
            for(let j = i + 1;j < arrLength;j++){
                if(arr[i] && arr[j] && arr[i][key] && arr[j][key]){
                    if(arr[i][key] > arr[j][key]){
                        [arr[i],arr[j]] = [arr[j],arr[i]];
                    }
                }
            }
        }
    }
    return arr;
}

function bubbleSort(arr,key=null){
    let arrLength = arr.length;
    if(typeof(arr[0]) === ('string' || 'number')){
        for(let i = 0;i < arrLength;i++){
            for(let j = 0;j < arrLength;j++){
                if(arr[j] && arr[j+1]){
                    if(arr[j] > arr[j+1]){
                        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
                    }
                }
            }
        }
    } else if(typeof(arr[0] === 'object')){
        for(let i = 0;i < arrLength;i++){
            for(let j = i + 1;j < arrLength;j++){
                if(arr[i] && arr[j] && arr[i][key] && arr[j][key]){
                    if(arr[i][key] > arr[j][key]){
                        [arr[i],arr[j]] = [arr[j],arr[i]];
                    }
                }
            }
        }
    }

    return arr;
}

function SortData(OriginalComponent) {
    function NewComponent(args){
        const { arr, setArr } = args;
        const arrLength = arr.length;
        return(
            <OriginalComponent 
                setArr={setArr}
                arr={arr} 
                method={arrLength < 11 ? (selectionSort || bubbleSort) : mergeSort} 
            />
        )
    }
    return NewComponent;
}

SortData.propTypes = {

}

export default SortData;

