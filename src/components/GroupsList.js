import { Component} from "react";

import { uuidv4 } from "../utils/uuidv4";
import './styles.css';

class GroupsList extends Component {
    state = {
        groups: this.props.groups,
        searchGroupTags: "",
        searchGroupDesc: "",
    }
    

    handleTagSearch = (e) => {
        console.log(this.state.students)
        this.setState({
            searchGroupTags: e.target.value,
        })
    }

    handleDescSearch = (e) => {
        this.setState({
            searchGroupDesc: e.target.value,
        })
    }

    render = () => {
        const filteredGroups = this.state.groups.map(group => 
            <>
            <div className="student" key={uuidv4(group.groupName)}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{group.groupName}</h5>

                        {group.students.filter(student => (student.desc.includes(this.state.searchGroupDesc)) && (student.tags.find(tag => 
                        tag.includes(this.state.searchGroupTags)))).map(it => (
                            <div key={uuidv4(it.email)}>
                                <p className="card-text">{it.name} {it.surname}</p>
                                <p className="card-text">{it.email}</p>
                                <p className="card-text">{it.desc}</p>
                                <ul style={{listStyle: 'none',}}>{it.tags.map(tag => {
                                    return <li key={uuidv4(tag)}>#{tag}</li>})}
                                </ul>
                                <hr></hr>
                            </div>
                        ))}    
                    </div>
                </div>
            </div>
            </>
        )

        return (
            <>
                <div className="form-group w-75 searchInput">
                    <input className="form-control"
                        type="text"
                        placeholder="Search by tags"
                        value={this.state.searchGroupTags}
                        onChange={this.handleTagSearch}>
                    </input>
                    <textarea className="form-control"
                            rows="2"
                            placeholder="Search by description"
                            value={this.state.searchGroupDesc}
                            onChange={this.handleDescSearch}>
                    </textarea>
                </div>
    
                {filteredGroups}
                
            </>
        )
    }
    
}

export default GroupsList;