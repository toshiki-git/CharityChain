import React from "react";
import SelectList from "@/app/components/Select/SelectList";

const page = () => {
  return (
    <div>
      <div>
        <div className="text-3xl m-4 font-semibold">
          あなたの状況に合わせてジャンルを選択してください
        </div>
      </div>
      <SelectList />
    </div>
  );
};

export default page;
