import styles from "./AddStudentModal.module.css"
import { useState } from "react";
import Button from "../Button";

export default function AddStudentModal({ onClose, onAdd }) {
    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');

    const handleAddStudent = () => {
        const trimmedName = name.trim();
        const isNameValid = /^[a-zA-Z]+$/.test(trimmedName);

        const isRollValid = !isNaN(parseInt(roll, 10)) && Number.isInteger(parseFloat(roll));

        if (isNameValid && isRollValid) {
            onAdd({ name: trimmedName, roll: parseInt(roll, 10) });
            onClose();
        } else {
            console.error('Invalid name or roll. Please provide valid inputs.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.inputArea}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Roll:
                        <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} />
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleAddStudent} label="Add Student" />
                    <Button onClick={onClose} label="Cancel" />
                </div>
            </div>
        </div>
    );
}