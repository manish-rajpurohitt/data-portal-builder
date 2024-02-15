import { Card, Typography } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



let TABLE_HEAD = ["Name", "Type", "Sub Type", "Actions"];

let TABLE_ROWS = [];

export function Table(props) {
  let { setPopup, data } = props;
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
          {TABLE_ROWS.map(({ name, type, subType }, index) => {
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
                <td className={classes} style={{ height: "10px" }}>
                  <div className="table-actions">

                    <MdDelete size={30} title="Delete" cursor={"pointer"} />
                    <FaEdit size={30} title="Edit" cursor={"pointer"} onClick={() => setPopup(true, "EDIT")} />
                  </div>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}