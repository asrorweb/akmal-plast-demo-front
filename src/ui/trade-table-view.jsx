import { Card, Typography } from "@material-tailwind/react";
import numeral from "numeral";
import { v4 as uuidv4 } from "uuid";

function TradeTableView({ data }) {
  const TABLE_HEAD = ["Name", "Metr (dona)", "Sum (1 metr/dona)", "Summa", ""];

  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100  bg-blue-700 p-4"
              >
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(
            ({ name, salePrice, saleId, saleMater, saleSum }, index) => (
              <tr key={uuidv4()} className="border-b-2">
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-medium capitalize"
                  >
                    {name.slice(0, 20)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal text-gray-700"
                  >
                    {saleMater}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal text-gray-700"
                  >
                    {numeral(salePrice).format("0,0")}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal text-gray-700"
                  >
                    {numeral(saleSum).format("0,0")}
                  </Typography>
                </td>
                <td className="flex justify-center p-4">
                  {/* <DeleteEditBtn /> */}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}

export default TradeTableView;
