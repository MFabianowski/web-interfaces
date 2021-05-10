import { Component} from "react";
import { uuidv4 } from "../utils/uuidv4";
import './styles.css';
import NewStudent from "./NewStudent";

class NewGroup extends Component {
    state = {
        groupNameInput: "",
        students: [],
    }

    addMember = (name, surname, email, desc, tags) => {
        this.setState({
            students: this.state.students.concat({
                name: name,
                surname: surname,
                email: email,
                desc: desc,
                tags: tags,
            })
        })
    };

    handleGroupNameChange = (event) => {
        this.setState({
            groupNameInput: event.target.value
        })
    };

    handleGroupSubmit = () => {
        if (this.state.groupNameInput === "") {
            alert("Group name cannot be blank!");
        } else {
            this.props.groupAdder(this.state.groupNameInput, this.state.students)
            this.setState({
                groupNameInput: "",
                students: [],
            })
        }
    }

    render() {

        const addedMembers = this.state.students.map(it => (
            <div className="students">
                    <div className="student" key={uuidv4(it.email)}>
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
                </div>
        ))

        return (
            <>
                <div className="addInput">
                    <h4 style={{textAlign: 'center',}}>Add your group to find fantastic project buddies!!</h4>

                    <div className="row">
                        <div className="col">
                            <input className="form-control"
                                type="text"
                                placeholder="Group name"
                                value={this.state.groupNameInput}
                                onChange={this.handleGroupNameChange}>
                            </input>
                        </div>
                    </div>

                    <NewStudent adder={this.addMember}></NewStudent>

                    {addedMembers}

                    <button className="btn btn-primary" style={{width: '20%', margin: '20px 0px 20px 0px', position: 'absolute', left: '40%',}} onClick={this.handleGroupSubmit}>Add group</button>
                </div>
            </>
        )
    }
}

export default NewGroup;