import { useState } from 'react';

export function TaskItem({ task, editTask }) {
  const [isEditing, setIsEditing] = useState(false); // State that will determine if we are editing the task or not
  const [newText, setNewText] = useState(task.taskDesc); // State that will be the text of the task (will either be a paragraph or input)

  // When the item is saved, call the patch method with the new text
  function handleSave() {
    editTask(task, newText);
    setIsEditing(false);
  };

  return (
    <li>
      <div>
        {isEditing ? (
            // If we are editing the task, turn the text into an input and put a save button that will update the task
          <>
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
            // If we are not editing the task (default), just show it as a paragraph
          <>
            <p>{task.taskDesc}</p>
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button onClick={() => editTask(task, null)}>❌</button>
          </>
        )}
      </div>
    </li>
  );
}