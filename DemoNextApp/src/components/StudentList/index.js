import styles from "./students.module.css"
import { useState, useEffect } from "react"

async function getStudents() {
    const res = await fetch(`http://127.0.0.1:8000/list-student/`)
    return res.json()
}

export default function StudentList({ onEvent, removeMode, studentList, setStudentList }) {

    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const studentData = await getStudents();
            setStudents(studentData);
            console.log(studentData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoading(false)
    }, [onEvent]);

    const handleCheckboxChange = (studentId) => {
        setStudentList((studentList) => {
            if (studentList.includes(studentId)) {
                return studentList.filter((id) => id !== studentId);
            } else {
                return [...studentList, studentId];
            }
        });
        console.log(studentId)
    }

    return (
        <main className={styles.wrapper}>
            {
                isLoading ? <h3>Student Data is loading...</h3> :
                    <>
                        <h1>List of Students</h1>
                        {
                            students.length === 0 ? (
                                <p>No student is currently registered.</p>
                            ) : (
                                <table className={styles.studentTable}>
                                    <thead>
                                        <tr>
                                            {removeMode && <th></th>}
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Roll</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id}>
                                                {removeMode && (
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={studentList.includes(student.id)}
                                                            onChange={() => handleCheckboxChange(student.id)}
                                                        />
                                                    </td>
                                                )}
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.roll}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        }
                    </>
            }
        </main >
    )
}