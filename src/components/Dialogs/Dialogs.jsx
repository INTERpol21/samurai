import style from "./Dialogs.module.css"
import {dialogsElements, messagesElements} from "../../Store/Store";



const Dialogs = () => {


    return (
        <div className={style.dialog__inner}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.dialogs__messages}>
                {messagesElements}
            </div>
        </div>

    )
}

export default Dialogs;
