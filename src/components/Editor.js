import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textArray: [""],
            currentPoint: ""
        }
    }

    handleKeyDown(e) {
        const charToAdd = getCharFromKeyPress(e.key);
        if(charToAdd !== undefined) {
            if(this.state.textArray.length > 0) {
                let current;
                if(charToAdd === "-1") {
                    current = this.state.textArray[this.state.textArray.length - 1].slice(0, this.state.textArray[this.state.textArray.length - 1].length - 1)  
                }
                else {
                    current = this.state.textArray[this.state.textArray.length - 1] + charToAdd; 
                }
                this.setState({
                    textArray: [...this.state.textArray, current],
                    currentPoint: this.state.currentPoint
                })
            }
            else {
                this.setState({
                    textArray: [charToAdd]
                })
            }
        }
    }

    onSliderChange(value) {
        this.setState({
            textArray: this.state.textArray,
            currentPoint: this.state.textArray[value]
        });
    }

    render() {
        return (
            <div className="main">
                <textarea className="formControl editor" onKeyDown={this.handleKeyDown.bind(this)}></textarea>
                <Slider className="slider"
                        min={0}
                        max={this.state.textArray.length}
                        onChange={this.onSliderChange.bind(this)}
                        railStyle={{
                            height: 2
                        }}
                        handleStyle={{
                            height: 28,
                            width: 28,
                            marginLeft: 0,
                            marginTop: -14,
                            backgroundColor: "red",
                            border: 1
                        }}
                        trackStyle={{
                            background: "none"
                        }}
                />
                <textarea className="formControl editor" disabled="disabled" value={this.state.currentPoint}></textarea>
            </div>
        )
    }
}

function getCharFromKeyPress(key) {
    if(key.length > 1) {
        if(key === "Enter")
            return "\n";
        if(key === "Backspace")
            return "-1";
        console.log(key);
        return;
    }

    return key;
}

export default Editor;