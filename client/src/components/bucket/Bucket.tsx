import { Divider } from "antd"
import { TaskCard } from "../task-card/TaskCard"


function Bucket(props:{color:string , title:string}){
const {color , title} = props


return (<div className="w-80 pl-4 pr-4">
<div >
<p className="text-sm font-bold text-cyan-950">{title}</p>
</div>
<Divider  className="m-0" style={{backgroundColor:color}} />

<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
<TaskCard title="Convert it from plaxe to other" ></TaskCard>
</div>)

}

export default Bucket