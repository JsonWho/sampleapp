import React, { Component } from 'react';
import './CatLine.css';


const CatLine = (props) => {

    let class_names = 'catline ';
    class_names += props.isSelected ? 'selected' : '';

    return (
    <div className={class_names} onClick={props.onClick}>
        {props.text}
    </div>
    );

};


export default CatLine;