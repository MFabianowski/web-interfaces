import { Component} from "react";
import { Route, Switch } from 'react-router-dom';

import NewStudent from "./NewStudent";
import NewGroup from "./NewGroup";
import StudentsList from "./StudentsList";
import GroupsList from "./GroupsList";
import './styles.css';

class Main extends Component {
    state = {
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
        ],
        
        groups: [
            {
                groupName: "R team",
                students: [{
                    name: "John",
                    surname: "Rocketer",
                    email: "Rteamleader@gmail.com",
                    desc: "We are team Rocket!",
                    tags: ["R", "Data-Science"]
                },
                {
                    name: "Martin",
                    surname: "Martian",
                    email: "martianToR@gmail.com",
                    desc: "Data science is my passion",
                    tags: ["R", "Data-Science", "Python"]
                }],
            }
        ]
    }

    addNewStudent = (name, surname, email, desc, tags) => {
        this.setState({
            students: this.state.students.concat({
                name: name,
                surname: surname,
                email: email,
                desc: desc,
                tags: [...tags],
            })
        })
    }

    addNewGroup = (groupName, students) => {
        this.setState({
            groups: this.state.groups.concat({
                groupName: groupName,
                students: students,
            })
        })
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact>
                <section>
                    <section className="indent-1-section"><StudentsList students={this.state.students}/></section>
                    <section className="indent-2-section"><GroupsList groups={this.state.groups}></GroupsList></section>
                </section>
                </Route>
                <Route path="/newStudent" exact>
                    <NewStudent adder={this.addNewStudent}/>
                </Route>
                <Route path="/newGroup" exact>
                    <NewGroup groupAdder={this.addNewGroup}/>
                </Route>
                <Route>
                    <h2>404 not found</h2>
                </Route>
            </Switch>
        )
    }
}
export default Main;