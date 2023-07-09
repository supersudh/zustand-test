import { produce } from "immer";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export interface Task {
  title: string;
  state: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string, state: string) => void;
  deleteTask: (title: string) => void;
  draggedTask: null | string;
  setDraggedTask: (title: null | string) => void;
  moveTask: (title: string, state: string) => void;
  tasksInOngoing?: number;
}

export const useStore = create<TaskState>()(
  subscribeWithSelector(
    devtools((set) => ({
      // tasks: [{ title: "Test Task", state: "ONGOING" }],
      tasks: [],
      addTask: (title: string, state: string) =>
        set(
          produce(
            (store) => {
              store.tasks.push({ title, state });
            },
            false,
            "addTask"
          )
        ),
      deleteTask: (title: string) =>
        set((store) => ({
          tasks: store.tasks.filter((t) => t.title !== title),
        })),
      draggedTask: null,
      setDraggedTask: (title: null | string) => set({ draggedTask: title }),
      moveTask: (title: string, state: string) =>
        set((store) => ({
          tasks: store.tasks.map((task) =>
            task.title === title ? { title, state } : task
          ),
        })),
    }))
  )
);

useStore.subscribe(
  (store => store.tasks),
  (newTasks, prevTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === 'ONGOING')
        .length,
    });
  }
);
