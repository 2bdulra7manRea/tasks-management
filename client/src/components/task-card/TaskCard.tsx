import style from "./style.module.css";

export function TaskCard(props:{title:string , createdAt?:string}) {

    const {title,createdAt} = props

  return (
    <>
      <div className={style.taskCard}>
        <div className="p-4">
          <p className="text-sm">{title}</p>
        </div>
        <div className="flex justify-between"></div>
      </div>
    </>
  );
}
