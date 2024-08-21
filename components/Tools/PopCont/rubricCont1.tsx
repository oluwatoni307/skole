import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { rubricAtom } from "@/app/sharedState";
import { Input } from "@/components/ui/input";

type Props = {};

const RubricCont: React.FC<Props> = ({}: Props) => {
  const [rubric, setRubric] = useAtom(rubricAtom);

  const increaseRows = () => {
    if (rubric.length >= 10) {
      return;
    }

    setRubric([...rubric, Array(rubric[0].length).fill("")]);
  };

  const increaseColumns = () => {
    if (rubric[0].length >= 11) {
      return;
    }

    setRubric(rubric.map((row) => [...row, ""]));
  };

  const decreaseRows = () => {
    if (rubric.length <= 1) {
      return;
    }

    setRubric(rubric.slice(0, -1));
  };

  const decreaseColumns = () => {
    if (rubric[0].length <= 2) {
      return;
    }

    setRubric(rubric.map((row) => row.slice(0, -1)));
  };

  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    const value = e.target.value;
    setRubric((rubric) => {
      const newRubric = rubric.map((row) => [...row]);
      newRubric[rowIndex][columnIndex] = value;
      return newRubric;
    });
  };

  const rubricHTML = (
    <tbody>
      <tr>
        <th>Grades/Criteria</th>
        {Array.from({ length: rubric[0].length - 1 }, (_, i) => (
          <th key={i}>Level {i + 1}</th>
        ))}
      </tr>
      {Array.from({ length: rubric.length }, (_, i) => (
        <tr key={i}>
          <td>
            <Input
              type="text"
              placeholder="Criteria"
              value={rubric[i][0]}
              onChange={(e) => handleCellChange(e, i, 0)}
            />
          </td>
          {Array.from({ length: rubric[0].length - 1 }, (_, j) => (
            <td key={j}>
              <Input
                type="text"
                placeholder="Explanation for Grade"
                value={rubric[i][j + 1]}
                onChange={(e) => handleCellChange(e, i, j + 1)}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  const stringifyRubric = () => {
    let rows = `| Grades/Criteria | ${Array.from(
      { length: rubric.length - 1 },
      (_, i) => `Level ${i + 1}`
    ).join(" | ")} |\n`;

    for (const row of rubric) {
      const rowContent = row.map((column: any) => column.trim()).join(" | ");

      rows += `| ${rowContent} |\n`;
    }

    return rows;
  };

  return (
    <div className="rubric-popup flex flex-col gap-2">
      <div className="text-lg">
        <b>Rubric</b>
      </div>
      <hr />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"} className="w-fit">
            Rows
          </Badge>
          <Button
            size="sm"
            onClick={increaseRows}
            className="w-fit h-fit text-base font-bold"
          >
            +
          </Button>
          <Button
            size="sm"
            onClick={decreaseRows}
            className="w-fit h-fit  text-base font-bold"
          >
            -
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"} className="w-fit">
            Columns
          </Badge>
          <Button
            size="sm"
            onClick={increaseColumns}
            className="w-fit h-fit  text-base font-bold"
          >
            +
          </Button>
          <Button
            size="sm"
            onClick={decreaseColumns}
            className="w-fit h-fit  text-base font-bold"
          >
            -
          </Button>
        </div>
      </div>
      <table className="rubric">{rubricHTML}</table>
    </div>
  );
};

export default RubricCont;
