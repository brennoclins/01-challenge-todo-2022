import { TrashIcon } from "@heroicons/react/24/solid"

import styles from './List.module.css';

interface ListProps {
  listItemId: string,
  listItemText: string,
  listItemStatus: boolean,

  onUpdateTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
export function List({ listItemId, listItemText, listItemStatus, onUpdateTaskStatus, onDeleteTask }:ListProps) {
  
  function handleTaskStatusUpdate(id: string) {
    onUpdateTaskStatus(id);
  }

  function handleDeleteTask(id: string) {
    onDeleteTask(id)
  }

  return (
    <div className={styles.list}>
      <div className={styles.listItem}>
        <input 
          onClick={() => handleTaskStatusUpdate(listItemId)}
          type="checkbox" 
          name="item" 
          defaultChecked={listItemStatus} 
        />
        <span className={styles.listItemText}>
          {listItemText}
        </span>
      </div>
      <TrashIcon className={styles.trashButton}  onClick={() => handleDeleteTask(listItemId)}/>
    </div>
  )
}