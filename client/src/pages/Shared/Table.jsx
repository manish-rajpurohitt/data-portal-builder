import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { attributeService } from "../../services";
import React from "react";



let TABLE_HEAD = ["Name", "Type", "Sub Type", "Sub Value", "Actions"];

let TABLE_ROWS = [];

export function Table(props) {
  let { setPopup, data } = props;
  const [showWarning , setShowWarning] = React.useState(false);
  const [deleteAttrIdx, setDeleteAttrIdx] = React.useState();

  const deleteAttribute = async () => {
    let res = await attributeService.deleteAttribute(data[deleteAttrIdx]._id);
    setShowWarning(false);
    setDeleteAttrIdx(null);
    setPopup(false, "DELETE")
  }
  TABLE_ROWS = data;
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr style={{ alignItems: "center" }}>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, type, subType, subValue }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {type}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {subType ? subType : "-"}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {subValue ? subValue : "-"}
                  </Typography>
                </td>
                <td className={classes} style={{ height: "10px" }}>
                  <div className="table-actions">

                    <MdDelete size={30} title="Delete" cursor={"pointer"} onClick={() => {setShowWarning(true); setDeleteAttrIdx(index); return;}} />
                    <FaEdit size={30} title="Edit" cursor={"pointer"} onClick={() => setPopup(true, "EDIT", index)} />
                  </div>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showWarning ? 
      <>
        <div className="delete-sure-popup" >
          <div className="popup-inner" style={{width: '25%'}}>
            <div 
                style={{marginLeft: "25%",marginRight: '28%', padding:'5%'}}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
                style={{marginLeft: "20%"}}
              > Are you sure ?</Typography>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button onClick={deleteAttribute}>DELETE</button>
                <button onClick={() => setShowWarning(false)}>CANCEL</button>
              </div>
              
            </div>
          </div>
        </div>
      </> : <></>}
    </Card>
  );
}