import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textArray: [""],
            currentPoint: "",
            sliderTags: {}
        }
    }

    handleKeyDown(e) {
        const charToAdd = getCharFromKeyPress(e.key);
        if(charToAdd !== undefined) {
            let current;
            if(charToAdd === "-1") {
                current = this.state.textArray[this.state.textArray.length - 1].slice(0, this.state.textArray[this.state.textArray.length - 1].length - 1)  
            }
            else {
                current = this.state.textArray[this.state.textArray.length - 1] + charToAdd; 
            }
            this.setState({
                textArray: [...this.state.textArray, current],
                currentPoint: this.state.currentPoint,
                sliderTags: {...this.state.sliderTags}
            })
        }
    }
    

    onSliderChange(value) {
        this.setState({
            textArray: this.state.textArray,
            currentPoint: this.state.textArray[value]
        });
    }

    handleSaveButtonClick() {
        const tag = prompt("Enter tag");
        if (tag) {
            const position = this.state.textArray.length;
            const newTags = {...this.state.sliderTags};
            newTags[position] = tag;
            this.setState({
                textArray: this.state.textArray,
                currentPoint: this.state.currentPoint,
                sliderTags: newTags
            });
        }

    }

    exportFile() {
        const textData = {
            text: this.state.textArray,
            checkPoints: this.state.sliderTags
        };
        const file = new Blob([JSON.stringify(textData)], {type: "text/plain"});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "file.cflow";
        document.body.appendChild(element);
        element.click();
    }

    importFile(e) {
        const file = e.target.files[0];
        const context = this;
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            const resultJSON = JSON.parse(reader.result);

            context.setState({
                textArray: resultJSON.text,
                sliderTags: resultJSON.checkPoints,
                current: resultJSON.text[resultJSON.text.length - 1]
            });

        }
        reader.onerror = function() {
            console.error(reader.error);
        }

    }

    triggerFileImport() {
        document.getElementById("fileUpload").click();
    }

    render() {
        return (
            <div className="container">
            <textarea className="form-control editor" rows="10" onKeyDown={this.handleKeyDown.bind(this)}></textarea>
            <button className="btn btn-primary sidepanel" onClick={this.triggerFileImport.bind(this)}>Import</button>
            <button className="btn btn-primary sidepanel" onClick={this.handleSaveButtonClick.bind(this)}>Save</button>
            <button className="btn btn-primary sidepanel" onClick={this.exportFile.bind(this)}>Export</button>
            
            <input id="fileUpload" type="file" className="sidePanelElement" onChange={this.importFile.bind(this)}></input>
            <Slider className="slider editor"
                    min={0}
                    max={this.state.textArray.length}
                    onChange={this.onSliderChange.bind(this)}
                    marks={this.state.sliderTags}
                    railStyle={{
                        height: 2,
                        backgroundColor: "red"
                    }}
                    handleStyle={{
                        height: 20,
                        width: 20,
                        marginLeft: 0,
                        marginTop: -10,
                        backgroundColor: "blue",
                        border: 1
                    }}
                    trackStyle={{
                        background: "none"
                    }}
            />
                <textarea className="form-control editor" rows="10" disabled="disabled" value={this.state.currentPoint}></textarea>
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
        return;
    }

    return key;
}

export default Editor;