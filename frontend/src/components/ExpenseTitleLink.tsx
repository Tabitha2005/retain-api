import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import type { Expense } from "../types";

interface Props {
  expense: Expense;
  noWrap?: boolean;
}

export default function ExpenseTitleLink({ expense, noWrap = false }: Props) {
  return (
    <Link
      component={RouterLink}
      to={`/expenses/${expense._id}`}
      underline="hover"
      color="inherit"
      noWrap={noWrap}
      sx={{ fontWeight: 700, display: "block" }}
    >
      {expense.title}
    </Link>
  );
}
