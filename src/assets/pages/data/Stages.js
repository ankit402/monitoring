const stages = [
    {
      step: "STEP 1",
      title: "Pushed by bank",
      count: "7",
      description: "Last push 10:39",
      progress: 100,
      type: "normal",
    },
    {
      step: "STEP 2",
      title: "Acknowledged by OMA",
      count: "6",
      description: "1 rejected at receipt",
      progress: 86,
      type: "error",
    },
    {
      step: "STEP 3",
      title: "Pulled to embossing",
      count: "6",
      description: "Nothing waiting",
      progress: 86,
      type: "normal",
    },
    {
      step: "STEP 4",
      title: "Imported",
      count: "6",
      description: "2 records rejected",
      progress: 86,
      type: "warning",
    },
    {
      step: "STEP 5",
      title: "Cards printed",
      count: "175",
      total: "/ 178",
      description: "0 files printing · 3 held for reprint",
      progress: 98,
      type: "warning",
    },
  ];


  export default stages;