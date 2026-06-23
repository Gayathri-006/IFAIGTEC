import { C } from "../constants/colors";
import { StatType } from "../types";

export const STATS: StatType[] = [
  { value:"48+",     label:"Countries",          sub:"Global reach" },
  { value:"8",       label:"Regional Bodies",    sub:"Worldwide confederation" },
  { value:"25+",     label:"Committees",         sub:"Specialized domains" },
  { value:"340+",    label:"Member Organizations",sub:"Global members" },
  { value:"94%",     label:"Certification Pass", sub:"Industry-leading" },
  { value:"4.9★",    label:"Avg Rating",         sub:"Across all programs" },
];

export const STAT_COLORS = [
  [C.orange, C.amber],
  [C.purple, C.coral],
  [C.teal,   C.green],
  [C.orange, C.teal],
  [C.amber,  C.orange],
  [C.coral,  C.purple],
];
