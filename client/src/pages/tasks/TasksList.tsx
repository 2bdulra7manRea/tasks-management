import { Button } from "antd";
import Bucket from "../../components/bucket/Bucket";
import { useState } from "react";
import CreateTask from "../../components/create-task/CreateTask";

function TasksList() {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);

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
        <Bucket color="red" title="ToDo"></Bucket>
        <Bucket color="green" title="InProgress"></Bucket>
        <Bucket color="orange" title="InQA"></Bucket>
        <Bucket color="blue" title="Blocked"></Bucket>
        <Bucket color="purple" title="Done"></Bucket>
        <Bucket color="yellow" title="Deployed"></Bucket>
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
