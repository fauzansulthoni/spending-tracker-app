import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";

interface DynamicIconProps {
  iconName: string;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "action" | "error" | "disabled";
}

const iconImports: Record<
  string,
  () => Promise<{ default: React.ComponentType<SvgIconProps> }>
> = {
  ShoppingCartOutlined: () =>
    import("@mui/icons-material/ShoppingCartOutlined"),
  ReceiptLongOutlined: () => import("@mui/icons-material/ReceiptLongOutlined"),
  CreditCardOutlined: () => import("@mui/icons-material/CreditCardOutlined"),
  AttachMoneyOutlined: () => import("@mui/icons-material/AttachMoneyOutlined"),
  LocalAtmOutlined: () => import("@mui/icons-material/LocalAtmOutlined"),
  MoneyOffOutlined: () => import("@mui/icons-material/MoneyOffOutlined"),
  PaidOutlined: () => import("@mui/icons-material/PaidOutlined"),
  StorefrontOutlined: () => import("@mui/icons-material/StorefrontOutlined"),
  FastfoodOutlined: () => import("@mui/icons-material/FastfoodOutlined"),
  LocalGasStationOutlined: () =>
    import("@mui/icons-material/LocalGasStationOutlined"),
};
export const iconsArr = Object.keys(iconImports) as Array<
  keyof typeof iconImports
>;
const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size = "medium",
  color = "inherit",
}) => {
  const LazyIcon = React.lazy(
    iconImports[iconName] || (() => import("@mui/icons-material/HelpOutline"))
  );

  return (
    <Suspense fallback={<CircularProgress size={20} />}>
      <LazyIcon fontSize={size} color={color} />
    </Suspense>
  );
};

export default DynamicIcon;
