import { Component} from "react";

import { uuidv4 } from "../utils/uuidv4";
import './styles.css';

class StudentsList extends Component {
    state = {
        students: this.props.students,
        searchTags: "",
        searchDesc: "",
    }
    

    handleTagSearch = (e) => {
        console.log(this.state.students)
        this.setState({
            searchTags: e.target.value,
        })
    }

    handleDescSearch = (e) => {
        this.setState({
            searchDesc: e.target.value,
        })
    }

    render = () => {
        const studentsList = this.state.students.filter(student => ((student.desc.includes(this.state.searchDesc)) && (student.tags.find(tag => 
            tag.includes(this.state.searchTags))))).map(studentList => (
            <>
                <div className="students" key={uuidv4(studentList.email)}>
                    <div className="student">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{studentList.name} {studentList.surname}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{studentList.email}</h6>
                                <p className="card-text">{studentList .desc}</p>
                                <ul style={{listStyle: 'none',}}>{studentList.tags.map(tag => {
                                    return <li key={uuidv4(tag)}>#{tag}</li>})}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ))

        return (
            <>
                <div className="form-group w-75 searchInput">
                    <input className="form-control"
                        type="text"
                        placeholder="Search by tags"
                        value={this.state.searchTags}
                        onChange={this.handleTagSearch}>
                    </input>
                    <textarea className="form-control"
                            rows="2"
                            placeholder="Search by description"
                            value={this.state.searchDesc}
                            onChange={this.handleDescSearch}>
                    </textarea>
                </div>
    
                {studentsList}
                
            </>
        )
    }
    
}

export default StudentsList;