"use client"

import { useState } from 'react'

//import Image from 'next/image'
import styles from './page.module.css'
import StudentList from '@/components/StudentList'
import Button from '@/components/Button'
import AddStudentModal from '@/components/AddStudentModal'

export default function Home() {
  const [isAddStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [curState, setCurState] = useState(false)
  const [removeMode, setRemoveMode] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])

  const handleAddStudentButton = () => {
    setAddStudentModalOpen(true);
  };

  const handleRemoveStudentButton = async () => {
    console.log("Remove button clicked")
    if (removeMode === false) {
      setRemoveMode(true)
    }
    else {
      try {
        // Make an API request to remove selected students
        const response = await fetch('http://127.0.0.1:8000/remove-students/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ students: selectedStudents }),
        });

        if (!response.ok) {
          throw new Error(`Failed to remove students: ${response.statusText}`);
        }

        setSelectedStudents([]);
        setRemoveMode(false);
        setCurState(!curState)

        console.log('Students removed successfully');
      } catch (error) {
        console.error('Error removing students:', error);
      }
    }
  }

  const handleRemoveCancelButton = () => {
    setRemoveMode(false)
    setSelectedStudents([])
  }

  const handleAddStudent = async (studentData) => {
    try {
      const response = await fetch('http://localhost:8000/add-student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.statusText}`);
      }

      // Handling the response data here
      const responseData = await response.json();
      console.log('Student added successfully:', responseData);

      setCurState(!curState)
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleCloseModal = () => {
    setAddStudentModalOpen(false);
  }

  return (
    <main className={styles.main}>
      <StudentList onEvent={curState} removeMode={removeMode} studentList={selectedStudents} setStudentList={setSelectedStudents} />
      <div>
        {!removeMode && <Button onClick={handleAddStudentButton} label="Add Student" />}
        {<Button onClick={handleRemoveStudentButton} label="Remove Student" />}
        {removeMode && <Button onClick={handleRemoveCancelButton} label="Cancel" />}
      </div>
      {isAddStudentModalOpen && (
        <AddStudentModal onClose={handleCloseModal} onAdd={handleAddStudent} />
      )}
    </main>
  )
}
