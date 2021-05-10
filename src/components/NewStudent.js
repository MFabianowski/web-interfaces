import { Component} from "react";
import { uuidv4 } from "../utils/uuidv4";
import './styles.css';
import suggestdata from "../utils/suggestdata";

class NewStudent extends Component {
    state = {
        nameInput: "",
        surnameInput: "",
        emailInput: "",
        descInput: "",
        tagInput: "",
        tags: [],
        suggestions: [],

    }

    handleNameChange = (event) => {
        this.setState({
            nameInput: event.target.value
        })
    };

    handleSurnameChange = (event) => {
        this.setState({
            surnameInput: event.target.value
        })
    };

    handleEmailChange = (event) => {
        this.setState({
            emailInput: event.target.value
        })
    };

    handleDescChange = (event) => {
        this.setState({
            descInput: event.target.value
        })
    };
    
    handleTagsChange = (event) => {
        this.setState({
            tagInput: event.target.value
        });
        this.showSuggestion();
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.nameInput === "" || this.state.surnameInput === "" ||
            this.state.emailInput === "" || this.state.descInput === "" || this.state.tags === "") {
            alert("Inputs cannot be blank");
        }
        else {
            this.props.adder(this.state.nameInput, this.state.surnameInput, this.state.emailInput, this.state.descInput, this.state.tags)
            this.setState({
                nameInput: "",
                surnameInput: "",
                emailInput: "",
                descInput: "",
                tagInput: "",
                tags: []
            })
        }
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 9) {
            event.preventDefault();
        }

        if (this.state.suggestions.length && this.state.tagInput !== "") {
            var text = this.state.suggestions[0].text;
        } else if (!this.state.suggestions.length && this.state.tagInput !== "") {
            var text = this.state.tagInput;
        } else if (this.state.tagInput === "") {
            var text = "";
        }

        if (event.keyCode === 13 && text) {
            this.setState({
                tags: [...this.state.tags, text],
                tagInput: "",
            });
        } else if (event.code === 'Backspace' && !text) {
            this.removeTag (this.state.tags.length - 1);
        }
    };

    showSuggestion = () => {
        const suggestTagInput = suggestdata.filter((suggest) =>
            suggest.text.toLowerCase().includes(this.state.tagInput.toLowerCase())
        );

        const suggestTags = suggestTagInput.filter(
            (suggest) => !this.state.tags.includes(suggest.text)
        );

        this.setState({
            suggestions: suggestTags,
        });
    };

    removeTag = (k) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(k, 1);
        this.setState({
            tags: newTags,
        });
    };

    addTag = (text) => {
        this.setState({
            tags: [...this.state.tags, text],
            tagInput: "",
        });
    };


    render() {
        return (
            <>
                <div className="addInput">
                    <h4 style={{textAlign: 'center',}}>Add yourself to find great project teams!!</h4>

                    <div className="row">
                        <div className="col">
                            <input className="form-control"
                                type="text"
                                placeholder="Name"
                                value={this.state.nameInput}
                                onChange={this.handleNameChange}>
                            </input>
                        </div>
                        <div className="col">
                            <input className="form-control"
                                type="text"
                                placeholder="Surname"
                                value={this.state.surnameInput}
                                onChange={this.handleSurnameChange}>
                            </input>
                        </div>
                        <div className="col">
                            <input className="form-control"
                                type="text"
                                placeholder="E-mail"
                                value={this.state.emailInput}
                                onChange={this.handleEmailChange}>
                            </input>
                        </div>
                    </div>

                    <div className="form-outline">
                        <textarea className="form-control"
                            rows="2"
                            placeholder="Description"
                            value={this.state.descInput}
                            onChange={this.handleDescChange}>
                        </textarea>
                    </div>

                    <div>
                        <div className="addedTags">
                            {this.state.tags.map((tag, i) => (
                                <div key={uuidv4(i)} style={{margin: '0.5%',}}>
                                    {tag}
                                    <div style={{display: 'inline-block', margin: '0.2%',}} className="btn btn-danger btn-sm" onClick={() => this.removeTag (i)}>x</div>
                                </div>
                            ))}
                        </div>
                                
                        <div className="form-outline">
                            <label htmlFor="tag-input">To add tag press enter, to delete tag press backspace:</label>
                                <input
                                    id="tag-input"
                                    className="form-control"
                                    type="text"
                                    placeholder="Add tag"
                                    value={this.state.tagInput}
                                    onChange={this.handleTagsChange}
                                    onKeyDown={this.handleKeyDown}>
                                </input>

                                {this.state.tagInput && this.state.suggestions.length && (
                                    <div style={{position: 'absolute', zIndex: '10',}}>
                                        {this.state.suggestions.map((it) => (
                                            <div key={uuidv4(it)}
                                            className="suggestedItem"
                                            onClick={() => this.addTag(it.text)}>
                                                {it.text}
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                        
                        <button className="btn btn-primary" style={{width: '20%', margin: '0px 0px 30px 0px', position: 'absolute', left: '40%',}} onClick={this.handleSubmit}>Add student</button>
                    </div>
                </div>
            </>
        )
    }
}

export default NewStudent;