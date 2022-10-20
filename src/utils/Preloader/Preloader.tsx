import gif from "../../assets/images/gif.gif"
import React, {FC} from "react";


let Preloader: FC = () => {
    return (
        <div>
            <img src={gif} alt=""/>
        </div>

    )
}

export default Preloader