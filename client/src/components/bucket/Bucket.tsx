import { Divider } from "antd";
import { TaskCard } from "../task-card/TaskCard";
import { Task } from "../../common/types/tasks.type";

function Bucket(props: { color: string; title: string, data?: Task[] }) {
  const { color, title, data } = props;

  return (
    <div className="m-4" style={{ width: "300px" }}>
      <div>
        <p className="text-sm font-bold text-cyan-950">{title}</p>
      </div>
      <Divider className="m-0" style={{ backgroundColor: color }} />

      {data?.map((item) => {
        return <TaskCard title={item.title}></TaskCard>
      })}
    </div>
  );
}

export default Bucket;
