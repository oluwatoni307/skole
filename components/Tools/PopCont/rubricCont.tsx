import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { rubricAtom } from "@/app/sharedState";
import { Input } from "@/components/ui/input";

type Props = {};

const RubricCont: React.FC<Props> = ({}: Props) => {
  const [rubric, setRubric] = useAtom(rubricAtom);


  return (
    <div className="rubric-popup flex flex-col gap-2">
      <div className="text-lg">
        <b>Rubric</b>
      </div>
    </div>
  );
};

export default RubricCont;
