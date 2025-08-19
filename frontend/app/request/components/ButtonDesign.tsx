import { Delete, Edit } from "@mui/icons-material"


type ButtonGroupProps = {
    onEdit?: () => void;
    onDelete?: ()=> void;
}


export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onEdit, onDelete }) => {
    return(
        <div className="flex "> 
            <button className="bg-blue-700 text-white font-semibold p-1 text-xs rounded-l-md hover:bg-blue-600  cursor-pointer" onClick={onEdit}><Edit fontSize="small"/> </button>
            <button className="bg-red-700  text-white font-semibold p-1 text-xs rounded-r-md hover:bg-red-600   cursor-pointer" onClick={onDelete}><Delete fontSize="small"/></button>
        </div>  
    )
}
   