import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textArray: [],
        }
    }

    handleKeyDown(e) {
        if(isValidKey(e.key)) {
            if(this.state.textArray.length > 0) {
                this.setState({
                    textArray: [...this.state.textArray, this.state.textArray[this.state.textArray.length - 1] + e.key]
                })
            }
            else {
                this.setState({
                    textArray: [e.key]
                })
            }
        }

    }

    render() {
        return (
            <textarea className="formControl" onKeyDown={this.handleKeyDown.bind(this)}></textarea>
        )
    }
}

function isValidKey(key) {
    const keys = ['a', 'b', 'c', 'd'];
    return keys.includes(key);
}

export default Editor;