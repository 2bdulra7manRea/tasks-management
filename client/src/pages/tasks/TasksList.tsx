import { Button } from "antd"
import Bucket from "../../components/bucket/Bucket"



function TasksList(){

return <>


<div className="flex justify-between">
<h3>Tasks</h3>
<Button type="primary">
    Add Tasks
</Button>
</div>

<div className="flex justify-between">
<Bucket color="red" title='ToDo'></Bucket>
<Bucket color='green' title='InProgress' ></Bucket>
<Bucket color='orange' title='InQA'></Bucket>
<Bucket color='blue' title='Blocked'></Bucket>
<Bucket color='purple' title='Done'></Bucket>
<Bucket color="yellow" title='Deployed'></Bucket>
    </div>


</>

}

export default TasksList