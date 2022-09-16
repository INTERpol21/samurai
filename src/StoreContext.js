import {createContext} from "react";


const StoreContext = createContext(null);

// //Прячем логигу в Provider
// export const Provider = (props) => {
//     return (
//         <StoreContext.Provider value={store}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }


export default StoreContext

