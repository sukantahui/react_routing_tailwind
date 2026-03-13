const elements = [
  { symbol: "H",  name: "Hydrogen", group: "Nonmetal" },
  { symbol: "He", name: "Helium",   group: "Noble gas" },
  { symbol: "Li", name: "Lithium",  group: "Alkali metal" },
  { symbol: "Na", name: "Sodium",   group: "Alkali metal" },
  { symbol: "Cl", name: "Chlorine", group: "Halogen" },
  { symbol: "Br", name: "Bromine",  group: "Halogen" },
  { symbol: "Ne", name: "Neon",     group: "Noble gas" },
];

const groupedByGroup = Object.groupBy(elements, (e) => e.group);
console.log(groupedByGroup);