import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import trash from "../assets/trash-2.svg";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore((store) => store.deleteTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task?.title as string)}
      onDragEnd={() => setDraggedTask(null)}
    >
      <div>{task?.title}</div>
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(title)} />
        </div>
        <div className={classNames("status", task?.state)}>{task?.state}</div>
      </div>
    </div>
  );
}
