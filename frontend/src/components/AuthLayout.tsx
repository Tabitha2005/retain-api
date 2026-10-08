import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import Logo from "./Logo";
import BudgetRing from "./BudgetRing";
import { brand } from "../theme";
import { formatMoney } from "../utils/format";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" } }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: brand.primaryDark,
          color: "#FFFFFF",
          p: 6,
        }}
      >
        <Logo light />

        <Box sx={{ maxWidth: 440 }}>
          <Typography variant="h1" sx={{ mb: 2 }}>
            See what you have left before you spend it.
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.78)", fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Track every expense, set a monthly budget, and know where you stand at a glance.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            bgcolor: "#FFFFFF",
            color: "text.primary",
            borderRadius: 4,
            p: 3,
            maxWidth: 440,
          }}
        >
          <BudgetRing value={0.83} size={116} stroke={11} color={brand.caution}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.375rem", lineHeight: 1 }}>83%</Typography>
              <Typography variant="caption" color="text.secondary">
                used
              </Typography>
            </Box>
          </BudgetRing>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Example month
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1.5rem" }}>{formatMoney(1245)}</Typography>
            <Typography variant="body2" color="text.secondary">
              of {formatMoney(1500)} budget
            </Typography>
            <Typography variant="body2" sx={{ color: brand.caution, fontWeight: 700, mt: 0.5 }}>
              Approaching your budget
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "grid", placeItems: "center", p: { xs: 3, sm: 6 }, bgcolor: "background.paper" }}>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 4 }}>
            <Logo />
          </Box>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
            {subtitle}
          </Typography>
          {children}
          <Box sx={{ mt: 3 }}>{footer}</Box>
        </Box>
      </Box>
    </Box>
  );
}
