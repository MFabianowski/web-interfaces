  const students = {
    width: '80%',
    margin: '0 auto',
    padding: '40px',
};
    
const student = {
    padding: '10px',
    overflow: 'auto',
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
};
    
const addInput = {  
    padding: '20px',
    width: '70%',
    margin: '0 auto',
};
    
const suggestedItem = {
    border: '2px solid black',
    width: '5rem',
    backgroundColor: 'white',
    cursor: 'pointer',
};
    
const addedTags = {
    border: '2px solid black',
    height: '5rem',
    overflow: 'auto',
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const suggestdata = [
    { id: 1, text: "Python" },
    { id: 2, text: "Java" },
    { id: 3, text: "C#" },
    { id: 4, text: "SAP" },
    { id: 5, text: "C++" },
    { id: 6, text: "SQL" },
    { id: 7, text: "docker" },
    { id: 8, text: "kubernetes" },
];

class AddForm extends React.Component {
    state = {
        nameInput: "",
        surnameInput: "",
        emailInput: "",
        descInput: "",
        tagInput: "",
        tags: [],
        suggestions: [],

        students: [
            {
                name: "Zbyszek",
                surname: "SAPperski",
                email: "zbyszek.sapper@gmail.com",
                desc: "SAP is back",
                tags: ["SAP"]
            },
            {
                name: "Mariusz",
                surname: "Kangaroo",
                email: "jump.kangaroo@gmail.com",
                desc: "I love Java, it's like Jabba.",
                tags: ["Java", "Swing"]
            }
        ]
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
            this.setState({
                students: [
                    ...this.state.students,
                    {
                        name: this.state.nameInput,
                        surname: this.state.surnameInput,
                        email: this.state.emailInput,
                        desc: this.state.descInput,
                        tags: [...this.state.tags],
                    },
                ],
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
                <div style={addInput}>
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
                        <div style={addedTags}>
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
                                            style={suggestedItem}
                                            onClick={() => this.addTag(it.text)}>
                                                {it.text}
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                        
                        <button className="btn btn-primary" style={{width: '20%', margin: '0', position: 'absolute', left: '40%',}} onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                    
                <div style={students}>
                    {this.state.students.map( it => (
                        <div style={student} key={uuidv4(it.email)}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{it.name} {it.surname}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{it.email}</h6>
                                    <p className="card-text">{it.desc}</p>
                                    <ul style={{listStyle: 'none',}}>{it.tags.map(tag => {
                                        return <li key={uuidv4(tag)}>#{tag}</li>})}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

ReactDOM.render(
    <AddForm />,
    document.getElementById('root')
  );