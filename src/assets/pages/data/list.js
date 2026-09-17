const stages = [
  {
    id: 1,
    title: "Pushed by Bank",
    description: "File received from bank",
    count: 24,
    status: "success",
    icon: "upload",
  },
  {
    id: 2,
    title: "Acknowledged by OMA",
    description: "File acknowledged successfully",
    count: 22,
    status: "success",
    icon: "check",
  },
  {
    id: 3,
    title: "Pulled to Embossing",
    description: "File pulled for personalization",
    count: 18,
    status: "processing",
    icon: "download",
  },
  {
    id: 4,
    title: "Imported",
    description: "File imported into NanoPerso",
    count: 16,
    status: "processing",
    icon: "database",
  },
  {
    id: 5,
    title: "Cards Printed",
    description: "Cards printed successfully",
    count: 12,
    status: "success",
    icon: "printer",
  },
];

export default stages;