import { Button } from "antd";
import Bucket from "../../components/bucket/Bucket";
import { useEffect, useState } from "react";
import CreateTask from "../../components/create-task/CreateTask";
import { useFetchTasks } from "../../api/tasks.query.api";
import { divideTasksByStatus } from "../../common/helpers/filterTasksBasedOnState";
import { TaskList } from "../../common/types/tasks.type";

function TasksList() {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);

  const [tasksData, setTasksData] = useState<TaskList>();

  const { data, isSuccess } = useFetchTasks();

  useEffect(() => {
    if (data && isSuccess) {
      setTasksData(divideTasksByStatus(data?.data));
    }
  }, [isSuccess, data]);

  console.log(data);

  const onCancelCreateModal = () => {
    setOpenCreateModal(false);
  };

  const openCreateModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <div>
      <div className="flex justify-between mt-4 mb-6">
        <h3>Tasks</h3>
        <Button type="primary" onClick={openCreateModal}>
          Add Tasks
        </Button>
      </div>

      <div
        className="flex justify-between"
        style={{ overflow: "auto", height: 420 }}
      >
        <Bucket color="red" title="ToDo" data={tasksData?.Todo}></Bucket>
        <Bucket
          color="green"
          title="InProgress"
          data={tasksData?.InProgress}
        ></Bucket>
        <Bucket color="orange" title="InQA" data={tasksData?.InQA}></Bucket>
        <Bucket color="blue" title="Blocked" data={tasksData?.Blocked}></Bucket>
        <Bucket color="purple" title="Done" data={tasksData?.Done}></Bucket>
        <Bucket
          color="yellow"
          title="Deployed"
          data={tasksData?.Deployed}
        ></Bucket>
      </div>

      {isOpenCreateModal && (
        <CreateTask
          onCancel={onCancelCreateModal}
          isModalOpen={isOpenCreateModal}
        />
      )}
    </div>
  );
}

export default TasksList;
